'''Auto-generate lib.nameMapping.d.ts from TestComplete's config'''

from enum import IntEnum
from sys import argv
from typing import Dict, List, Tuple, Optional, Generator, TextIO
from xml.etree import ElementTree
from xml.etree.ElementTree import Element
from textwrap import indent

# prefix used for TestComplete internal classes
CLASS_PREFIX = 'TestComplete.'


def convertPropertyType(propertyType: str):
    if propertyType == '0':
        return "int"

    if propertyType == '5':
        return "string"

    if propertyType == '7':
        # FIXME: this is for Captions particularily. Don't know actual type
        return "string"

    return propertyType


windowClasses = [
    'wxWindowNR',
    'DirectUIHWND',
    'MsiDialogCloseClass',
    'UnityWndClass',
    'Chrome_WidgetWin_1',
]

elementClasses = [
    'wxGLCanvas',
    'AfxControlBar80u',
    'ToolbarWindow32',
    'TkChild',
]


def convertWndClass(wndClass: str):
    if wndClass == '#32770':
        return 'Dialog'

    if wndClass in windowClasses:
        return 'Window'

    if wndClass in elementClasses:
        return 'Element'

    if wndClass.startswith('Afx:'):
        return 'Element'

    if wndClass.startswith('Shell '):
        return 'Element'

    if wndClass == 'ComboLBox':
        return 'ComboBox'

    if wndClass == 'SysTreeView32':
        return 'TreeView'

    return wndClass


def objectTypeByTypeInfo(typeInfo: str) -> str:
    '''Specific for wierdly-defined types that can't be accessed either way.'''

    if typeInfo == '{46C2FDC1-0B88-4245-9D6B-5AD3B87DC09C}':
        return 'Button'
    if typeInfo == '{10D9057F-974E-49CB-8F58-CC167BE618E9}':
        return 'ComboBox'
    if typeInfo == '{51B8FC7C-1CE0-4185-B9AA-D882A946B45C}':
        return 'Edit'
    if typeInfo == '{ADF2E615-C853-42FF-B44C-75965D86FA20}':
        return 'Edit'
    if typeInfo == '{730A4341-0216-4722-B30D-4BD92184A259}':
        return 'RadioButton'
    if typeInfo == '{BCA2EE90-6124-40BD-9D3D-A4857F2AC027}':
        return 'RadioButton'

    return 'Element'


class PropertyValue():
    def __init__(self, propType: str, value: str, valueType: str):
        # type of property
        self.type = propType
        self.value = value
        # type of value
        self.valueType = valueType


class NameMappingElement():
    def __init__(self, name: str):
        self.name = name
        self.props: Dict[str, PropertyValue] = {}
        # will save here only GUIDs since all objects should be in single dict
        self.childs: List[str] = []
        self.type = 'Element'  # can be overrided by properties


def printHeader(destinationFile: TextIO, baseFile: str):
    destinationFile.write(f'''/**
 * Mapping for all known objects.
 * NOTE: Auto-generated from {baseFile}
 */\n
''')


def getPropertyValue(el: Element) -> Optional[PropertyValue]:
    for value in el.findall('Value'):
        return PropertyValue(value.attrib.get('PropertyType', 'string'),
                             value.attrib.get('Value', ''),
                             value.attrib.get('Type', 'string'))
    return None


def getObject(el: Element, allObjects: Dict[str, NameMappingElement]):
    '''Creates mapped object by xml definition.'''

    obj = NameMappingElement(el.attrib['Name'])

    # try to deduce type based on <TypeInfo/>
    for typeInfo in el.findall('TypeInfo'):
        obj.type = objectTypeByTypeInfo(typeInfo.attrib['Item0'])

    # properties
    for props in el.findall('Properties'):
        for prop in props.findall('Property'):
            name = prop.attrib['Name']

            val = getPropertyValue(prop)
            if val:
                # special handling for type properties
                if name == 'ObjectType':
                    obj.type = val.value
                if name == 'WndClass':
                    obj.type = convertWndClass(val.value)
                if name == 'RootVisual.ClrClassName':
                    obj.type = val.value
                if name == 'ClrFullClassName':
                    # something like System.Windows.Controls.Grid. Get last
                    obj.type = val.value.split('.')[-1]
                else:
                    obj.props[name] = val

    # last chance to deduce type
    if obj.type == 'Element':
        if obj.name.startswith('radioButton'):
            obj.type = 'RadioButton'
        elif obj.name.startswith('comboBox'):
            obj.type = 'ComboBox'
        elif obj.name.startswith('button'):
            obj.type = 'Button'
        elif obj.name.endswith('Button'):
            obj.type = 'Button'
        elif obj.name.endswith('Form'):
            obj.type = 'Form'

    # child items
    for guid, child in getChilds(el, allObjects):
        obj.childs.append(guid)
        allObjects[guid] = child

    return obj


def getChilds(
    el: Element, allObjects: Dict[str, NameMappingElement]
) -> Generator[Tuple[str, NameMappingElement], None, None]:
    '''Iterate through all children of xml Element.'''

    for children in el.findall('Children'):
        for child in children.findall('Child'):
            yield child.attrib['Key'], getObject(child, allObjects)


def getAllMappedObjects(xmlRoot: Element) -> Dict[str, NameMappingElement]:
    '''Returns all objects contained in NameMapping object.'''

    allObjects: Dict[str, NameMappingElement] = {}

    for nodes in xmlRoot.findall('Nodes'):
        for guid, child in getChilds(nodes, allObjects):
            allObjects[guid] = child

    return allObjects


def generatePropsDeclarations(obj: NameMappingElement) -> str:
    result = ""

    for name, value in obj.props.items():
        if name.find('.') != -1:
            # FIXME: if property contains dots in name, it should be considered as child object
            result += f'{name.replace(".", "_")}: {convertPropertyType(value.valueType)};\n'
        else:
            result += f'{name}: {convertPropertyType(value.valueType)};\n'

    return indent(result, '    ')


def generateChildrenDeclaration(
        el: Element, allObjects: Dict[str, NameMappingElement]) -> str:

    content = ''

    for child in el.findall('Child'):
        children = generateElementDeclaration(child, allObjects)
        childContent = indent(children, '    ')
        content = childContent if content == '' else '\n'.join(
            [content, childContent])

    return content


def generateElementDeclaration(
        el: Element, allObjects: Dict[str, NameMappingElement]) -> str:
    '''Returns generated text for element definition including children.'''

    guid = el.attrib['Owner']
    obj = allObjects[guid]

    # in aliases we use not a real obj name but name of alias
    result = el.attrib['Name'] + ": "

    if obj.type != '':
        result += f'{CLASS_PREFIX}{obj.type} & '
    result += '{\n'
    result += generatePropsDeclarations(obj)
    children = generateChildrenDeclaration(el, allObjects)
    if children != '':
        result += '\n' + children

    return result + '};\n'


def writeInterfaceDeclaration(
        file: TextIO, el: Element,
        allObjects: Dict[str, NameMappingElement]) -> str:
    '''Handle top-level declaration in Aliases (most likely it's an app).'''

    guid = el.attrib['Owner']
    obj = allObjects[guid]

    file.write(f'    interface {obj.name} extends TestComplete.Window {{')
    text = ""
    for child in el.findall('Child'):
        children = generateElementDeclaration(child, allObjects)
        text = '\n'.join([text, indent(children, '    ')])

    file.write(indent(text, '    '))
    # file.write(text)
    file.write('    }\n\n')
    return obj.name


def generateFile(sourceXmlPath: str, destinationDTs: str):
    '''Top-level function for NameMapping file generation.'''

    xmlRoot = ElementTree.parse(sourceXmlPath).getroot()

    # map all object contained in NameMapping
    allObjects = getAllMappedObjects(xmlRoot)
    allInterfaces: List[str] = []

    with open(destinationDTs, 'w', encoding='utf-8') as generatedFile:
        printHeader(generatedFile, sourceXmlPath)

        generatedFile.write('declare namespace Aliases {\n')
        # iterate through Aliases
        for aliases in xmlRoot.findall('LogicalNodes'):
            for child in aliases.findall('Child'):
                # generatedFile.write('interface ')
                name = writeInterfaceDeclaration(generatedFile, child,
                                                 allObjects)
                allInterfaces.append(name)

        for name in allInterfaces:
            generatedFile.write(f'    const {name}: {name};\n')

        generatedFile.write('}\n')


if __name__ == "__main__":
    if len(argv) < 3:
        print(
            f"Usage: {__file__} <path to NameMapping.tcNM> <path to output nameMapping.d.ts>"
        )
        exit(1)

    print(f"\n- Use {argv[1]} to generate {argv[2]}\n")
    generateFile(argv[1], argv[2])

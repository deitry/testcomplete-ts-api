"""Auto-generate project.d.ts from TestComplete's config"""

from typing import TextIO
from sys import argv
from xml.etree import ElementTree
from xml.etree.ElementTree import Element


def printHeader(destinationFile: TextIO, baseFile: str):
    destinationFile.write(f'''/**
 * Declaration of Project variables.
 * NOTE: Auto-generated from {baseFile}
 */\n
''')


def typeByName(typeName: str) -> str:
    """Used for variables version 3."""

    if typeName == 'String':
        return 'string'

    if typeName == 'Integer':
        return 'int'

    if typeName == 'Double':
        return 'number'

    if typeName == 'Boolean':
        return 'boolean'

    if typeName == 'Password':
        return 'string'

    return "any"


def typeByGuid(guid: str) -> str:
    """Used for variables version 3."""

    if guid == '{123F0C0F-44B4-4BAF-B0E6-F3F89FD873B5}':
        return 'string'

    if guid == '{88422C25-DDF4-4EA1-B7CC-95779A023F5D}':
        return 'int'

    if guid == '{8562FD50-0B6E-489C-95A2-9C144116BD78}':
        return 'number'

    if guid == '{D25FDC80-E78F-4209-88B6-6FE2B0771206}':
        return 'boolean'

    # password
    if guid == '{B06407F3-6641-45A9-9692-DDE5B231F2CD}':
        return 'string'

    return "any"


def parseXML(xmlFile: str, destinationFile: TextIO):
    for variables in ElementTree.parse(xmlFile).getroot().findall('variables'):
        for data in variables.findall('data'):
            variablesVersion = data.attrib['Version']
            for items in data.findall('Items'):
                for variable in items.findall('Variable'):
                    name = variable.attrib['Name']
                    description = variable.attrib.get('Descr', "")
                    typeAttrib = variable.attrib["Type"]
                    if variablesVersion == "3":
                        varType = typeByGuid(typeAttrib)
                    elif variablesVersion == "4":
                        varType = typeByName(typeAttrib)
                    else:
                        varType = typeAttrib

                    if description:
                        destinationFile.write(f'        /** {description} */\n')

                    # TODO: variables values
                    # TODO: optional readonly - to not change variables during tests
                    destinationFile.write(f'        {name}: {varType};\n')


def generateFile(sourceXmlPath: str, destinationDTs: str):
    with open(destinationDTs, 'w') as generatedFile:
        printHeader(generatedFile, sourceXmlPath)
        generatedFile.write('declare namespace Project {\n')
        generatedFile.write('    interface _Variables extends TestComplete.ProjectVariables {\n')

        parseXML(sourceXmlPath, generatedFile)

        generatedFile.write('    }\n\n')
        generatedFile.write('    const Variables: _Variables;\n')
        generatedFile.write('    const Path: string;\n')
        generatedFile.write('    const ConfigPath: string;\n')
        generatedFile.write('}\n')


if __name__ == '__main__':
    if len(argv) < 3:
        print(f"Usage: {__file__}"
              " <path to ProjectName.mds>"
              " <path to output project.d.ts>")
        exit(1)

    print(f"\n- Use {argv[1]} to generate {argv[2]}\n")
    generateFile(argv[1], argv[2])

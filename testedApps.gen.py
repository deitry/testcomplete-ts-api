"""Auto-generate lib/testedApps.d.ts from TestComplete's config"""

from sys import argv
from typing import TextIO
from xml.etree import ElementTree
from xml.etree.ElementTree import Element


def printHeader(destinationFile: TextIO, baseFile: str):
    destinationFile.write(f'''/**
 * Declaration of all tested apps.
 * NOTE: Auto-generated from {baseFile}
 */\n
''')


def parseXML(xmlFile: str, destinationFile: TextIO):
    for children in ElementTree.parse(xmlFile).getroot().findall('children'):
        for child in children.findall('child'):
            for config in child.findall('config'):
                destinationFile.write(
                    f'    const {config.attrib["nodeName"]}: TestComplete.TestedApp;\n')


def generateFile(sourceXmlPath: str, destinationDTs: str):
    with open(destinationDTs, 'w') as generatedFile:
        printHeader(generatedFile, sourceXmlPath)
        generatedFile.write('declare namespace TestedApps {\n')
        parseXML(sourceXmlPath, generatedFile)
        generatedFile.write('}\n')


if __name__ == "__main__":
    if len(argv) < 3:
        print(f"Usage: {__file__} <path to TestedApps.tcTAs> <path to output testedApps.d.ts>")
        exit(1)

    print(f"\n- Use {argv[1]} to generate {argv[2]}\n")
    generateFile(argv[1], argv[2])

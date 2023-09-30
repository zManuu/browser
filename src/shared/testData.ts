import { File, fileType, fileTypes } from './File'
import { Directory } from './Directory'

function getTestFile(type: fileType = fileTypes[0]): File {
  return {
    type: 'file',
    name: `test.${type}`,
    parentPath: 'C:\\Users\\Manuel Rettkowski\\Downloads',
    sizeInKb: 5,
    isHidden: false
  }
}

function getTestDirectory(): Directory {
  return {
    type: 'directory',
    name: 'Downloads',
    parentPath: 'C:\\Users\\Manuel Rettkowski',
    sizeInKb: 50,
    isHidden: false
  }
}

export { getTestFile, getTestDirectory }

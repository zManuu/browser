import { File, fileType, fileTypes } from './File'
import { Directory } from './Directory'

function getTestFile(type: fileType = fileTypes[0]): File {
  return {
    type: 'file',
    name: `test.${type}`,
    parentPath: 'M:\\Developement\\Projects\\app\\browser\\src\\renderer\\src\\assets\\test-files',
    sizeInKb: 5,
    isHidden: false
  }
}

function getTestDirectory(): Directory {
  return {
    type: 'directory',
    name: 'test-files',
    parentPath: 'M:\\Developement\\Projects\\app\\browser\\src\\renderer\\src\\assets',
    sizeInKb: 50,
    isHidden: false
  }
}

export { getTestFile, getTestDirectory }

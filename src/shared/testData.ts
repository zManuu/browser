import { File } from './File'
import { Directory } from './Directory'

const testFile: File = {
  type: 'file',
  name: 'test.json',
  parentPath: 'C:\\Users\\Manuel Rettkowski\\Downloads\\test.txt',
  sizeInKb: 5,
  isHidden: false
}

const testDirectory: Directory = {
  type: 'directory',
  name: 'Downloads',
  parentPath: 'C:\\Users\\Manuel Rettkowski',
  sizeInKb: 50,
  isHidden: false
}

export { testFile, testDirectory }

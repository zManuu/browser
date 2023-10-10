import * as fsSync from 'fs'

function getFileStats(filePath: string): fsSync.Stats | false {
  try {
    const stats = fsSync.statSync(filePath)
    return stats
  } catch (e) {
    return false
  }
}

function isFileOrDirectory(path: string): 'file' | 'directory' {
  return fsSync.lstatSync(path).isDirectory() ? 'directory' : 'file'
}

export { getFileStats, isFileOrDirectory }

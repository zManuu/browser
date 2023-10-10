import { type Directory } from '../../shared/Directory'
import { type File } from '../../shared/File'
import { type FsEntry, isHidden } from '../../shared/FsEntry'
import { handleRequest } from '../ipc'
import * as fsAsync from 'fs/promises'
import { logger } from '../browser'
import { getFileStats, isFileOrDirectory } from '../utils/fsUtils'
import { join } from 'path'

const LOG_TAG = '[Browse]'

handleRequest('requestDirectory', async (_ev, directoryName) => {
  logger.info(
    `${LOG_TAG} A directory was requested and is now being handled: >"${directoryName}"< ...`
  )
  const val = await getDirectory(directoryName)
  return val
})

async function getDirectory(dirPath: string) {
  const subFilesAndDirectories = await fsAsync.readdir(dirPath)
  const subFileNames = subFilesAndDirectories.filter(
    (e) => isFileOrDirectory(join(dirPath, e)) === 'file'
  )
  const subDirectoryNames = subFilesAndDirectories.filter(
    (e) => isFileOrDirectory(join(dirPath, e)) === 'directory'
  )

  const subFiles = subFileNames.map((e) => {
    const fileStats = getFileStats(`${dirPath}\\${e}`)
    return {
      type: 'file',
      name: e,
      parentPath: dirPath,
      sizeInKb: fileStats ? fileStats.size : 'N/A',
      isHidden: isHidden(`${dirPath}\\${e}`)
    } as File
  })

  const subDirectories = subDirectoryNames.map((e) => {
    return {
      type: 'directory',
      name: e,
      parentPath: dirPath,
      sizeInKb: 'N/A',
      isHidden: isHidden(`${dirPath}\\${e}`)
    } as Directory
  })

  const directory: Directory = {
    type: 'directory',
    name: dirPath,
    parentPath: dirPath,
    sizeInKb: 'N/A',
    isHidden: isHidden(dirPath)
  }

  const fsEntries: FsEntry[] = [...subFiles, ...subDirectories]

  return {
    directory,
    fsEntries
  }
}

import { handleEmit, handleRequest } from './ipc'
import * as fs from 'fs/promises'
import * as fsSync from 'fs'
import { type File } from '../shared/File'
import { type Directory } from '../shared/Directory'
import { FsEntry, cleanPath, isHidden } from '../shared/FsEntry'
import { exec } from 'child_process'

export function enable() {
  console.log('enabling the browser window')

  handleRequest('requestDirectory', async (_ev, directoryName) => {
    console.log(`A directory was requested and is now being handled: ${directoryName}`)
    const val = await getDirectory(directoryName)
    return val
  })

  handleEmit('openFile', (_ev, filePath) => {
    const cleanFilePath = cleanPath(filePath)
    exec(`code "${cleanFilePath}"`, (error, _stdout, stderr) => {
      if (error) {
        console.error(`Error opening ${cleanFilePath} with Visual Studio Code: ${error.message}`)
        return
      }
      if (stderr) {
        console.error(`Error: ${stderr}`)
        return
      }
      console.log(`Opened ${cleanFilePath} with Visual Studio Code.`)
    })
  })
}

function getFileStats(filePath: string): fsSync.Stats | false {
  try {
    const statsPromise = fsSync.statSync(filePath)
    return statsPromise
  } catch (e) {
    return false
  }
}

async function getDirectory(dirPath: string) {
  const subFilesAndDirectories = await fs.readdir(dirPath)
  const subFileNames = subFilesAndDirectories.filter((e) => e.includes('.'))
  const subDirectoryNames = subFilesAndDirectories.filter((e) => !e.includes('.'))

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

import { exec } from 'child_process'
import { cleanPath } from '../../shared/FsEntry'
import { handleEmit } from '../ipc'
import * as fsAsync from 'fs/promises'
import * as fsSync from 'fs'
import { fileType, fileTypes } from '../../shared/File'
import config from '../../shared/Config'
import { compileTypescriptFile, runTypescriptFile } from '../utils/typescriptUtils'

const LOG_TAG = '[ContextMenu]'

handleEmit('contextMenuAction', (_ev, args) => {
  const path = cleanPath(args.fsEntryPath)

  switch (args.type) {
    //#region Open
    case 'open.open':
      console.log(`${LOG_TAG} Opening "${path}" ...`)
      exec(`code "${path}"`)
      break
    case 'open.vsc':
      console.log(`${LOG_TAG} Opening "${path}" in VSC ...`)
      exec(`code "${path}"`)
      break
    case 'open.intelij':
      console.log(`${LOG_TAG} Opening "${path}" in IntelliJ ...`)
      exec(`idea.exe "${path}"`)
      break
    case 'open.terminal':
      console.log(`${LOG_TAG} Opening terminal for directory "${path}" ...`)
      exec(`start /B "${path}"`)
      break
    //#endregion

    //#region Edit
    case 'edit.rename':
      console.log(`${LOG_TAG} Renaming file "${path}" to "${args.param || path}" ...`)
      fsAsync.rename(path, args.param || path)
      break
    case 'edit.clear':
      console.log(`${LOG_TAG} Clearing file "${path}" ...`)
      fsAsync.writeFile(path, '')
      break
    case 'edit.delete':
      console.log(`${LOG_TAG} Deleting file "${path}" ...`)
      fsAsync.unlink(path)
      break
    //#endregion

    //#region Create
    case 'create.directory':
      console.log(`${LOG_TAG} Creating directory "${path}\\${args.param || 'new directory'}" ...`)
      fsAsync.mkdir(`${path}\\${args.param || 'new directory'}`)
      break
    case 'create.gitignore':
      createFile(path, '.gitignore')
      break
    case 'create.txt':
    case 'create.js':
    case 'create.vue':
    case 'create.java':
    case 'create.css':
    case 'create.html':
    case 'create.xml':
    case 'create.json': {
      const fileTypeString = args.type.split('.')[1]

      // if fileTypeString is assignable to fileTypes, call createFile
      if (fileTypeString in fileTypes) {
        const fileType = fileTypeString as fileType
        createFile(path, args.param || `new file.${fileType}`)
      } else {
        // log a warning
        console.warn(`File type "${fileTypeString}" is not a valid file type.`)
      }

      break
    }
    //#endregion

    //#region Specific
    case 'gitignore.addrecommended':
      console.log(`${LOG_TAG} Adding recommended ignores to.gitignore file "${path}" ...`)
      fsAsync.appendFile(path, '\n' + config.GITIGNORE_RECOMMENDED.join('\n') + '\n')
      break
    case 'js.run':
    case 'mjs.run':
      console.log(`${LOG_TAG} Starting js-script "${path}" ...`)
      exec(`node "${path}"`)
      break
    case 'ts.run':
      runTypescriptFile(path)
      break
    case 'ts.compile':
      compileTypescriptFile(path)
      break
    //#endregion
  }
})

function createFile(parentPath: string, name: string): boolean {
  // if the file already exists, return false otherwise create it and return true
  try {
    fsSync.accessSync(parentPath + '\\' + name)
    return false
  } catch (e) {
    console.log(`${LOG_TAG} Creating file "${parentPath}\\${name}" ...`)
    fsSync.writeFileSync(parentPath + '\\' + name, '')
    return true
  }
}

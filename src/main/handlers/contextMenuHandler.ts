import { exec } from 'child_process'
import { cleanPath } from '../../shared/FsEntry'
import { handleEmit } from '../ipc'
import * as fsAsync from 'fs/promises'
import * as fsSync from 'fs'
import { fileType, fileTypes, templates } from '../../shared/File'
import config from '../../shared/Config'
import { compileTypescriptFile, runTypescriptFile } from '../utils/typescriptUtils'
import { join } from 'path'

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
    case 'edit.rename': {
      const pathSplit = path.split('\\')
      const lastPath = pathSplit.pop()

      if (!lastPath) {
        console.warn(`${LOG_TAG} Could not rename file "${path}" as lastPath was undefined.`)
        return
      }

      const pathWithoutlast = pathSplit.join('\\')
      const newPath = join(pathWithoutlast, args.params?.inputValue || lastPath)
      console.log(`${LOG_TAG} Renaming "${path}" to "${newPath}" ...`)
      fsAsync
        .rename(path, newPath)
        .then(() => console.log(`${LOG_TAG} Successfully renamed "${path}" to "${newPath}".`))
        .catch((e) => console.warn(`${LOG_TAG} Failed to rename "${path}" to "${newPath}".`, e))
      break
    }
    case 'edit.clear':
      if (fsSync.lstatSync(path).isDirectory()) {
        console.log(`${LOG_TAG} Clearing directory "${path}" ...`)
        fsAsync
          .readdir(path)
          .then((subFilesAndDirectories) =>
            subFilesAndDirectories.forEach((e) => {
              const eFullPath = join(path, e)
              fsAsync
                .rm(eFullPath, { recursive: true })
                .catch(() =>
                  console.warn(
                    `${LOG_TAG} Failed to clear directory "${path}" because subentry "${eFullPath}" failed.`
                  )
                )
            })
          )
          .then(() => console.log(`${LOG_TAG} Successfully cleared directory "${path}".`))
          .catch(() => console.warn(`${LOG_TAG} Failed to clear directory "${path}".`))
      } else {
        console.log(`${LOG_TAG} Clearing file "${path}" ...`)
        fsAsync
          .writeFile(path, '')
          .then(() => console.log(`${LOG_TAG} Successfully cleared file "${path}".`))
          .catch(() => console.warn(`${LOG_TAG} Failed to clear file "${path}".`))
      }
      break
    case 'edit.delete':
      console.log(`${LOG_TAG} Deleting "${path}" ...`)
      fsAsync
        .rm(path, { recursive: true })
        .then(() => console.log(`${LOG_TAG} Successfully deleted "${path}".`))
        .catch(() => console.warn(`${LOG_TAG} Failed to delete "${path}" ...`))
      break
    //#endregion

    //#region Create
    case 'create.directory': {
      const newDirPath = join(path, args.params?.inputValue || 'new directory')
      console.log(`${LOG_TAG} Creating directory "${newDirPath}" ...`)
      fsAsync
        .mkdir(newDirPath)
        .then(() => console.log(`${LOG_TAG} Successfully created directory "${newDirPath}".`))
        .catch(() => console.warn(`${LOG_TAG} Failed to create directory "${newDirPath}".`))
      break
    }
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
        const fileContent =
          args.params && args.params.selectedTemplate && templates.has(fileType)
            ? templates.get(fileType)?.get(args.params.selectedTemplate)
            : ''
        createFile(path, `${args.params?.inputValue || 'new file'}.${fileType}`, fileContent)
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
      fsAsync
        .appendFile(path, '\n' + config.GITIGNORE_RECOMMENDED.join('\n') + '\n')
        .then(() =>
          console.log(`${LOG_TAG} Successfully appended recommended ignores to "${path}".`)
        )
        .catch(() => console.log(`${LOG_TAG} Failed to append recommended ignores to "${path}".`))
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

function createFile(parentPath: string, name: string, content = ''): boolean {
  // if the file already exists, return false otherwise create it and return true
  try {
    fsSync.accessSync(parentPath + '\\' + name)
    return false
  } catch (e) {
    console.log(`${LOG_TAG} Creating file "${parentPath}\\${name}" ...`)
    fsSync.writeFileSync(parentPath + '\\' + name, content)
    return true
  }
}

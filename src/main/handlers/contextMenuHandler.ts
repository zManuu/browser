import { exec } from 'child_process'
import { cleanPath } from '../../shared/FsEntry'
import { handleEmit } from '../ipc'

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

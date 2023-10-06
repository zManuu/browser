import { handleRequest } from '../ipc'
import * as fsSync from 'fs'
import * as fsAsync from 'fs/promises'
import config from '../../shared/Config'

handleRequest('requestPreview', async (_ev, args) => {
  if (!fsSync.existsSync(args.path)) {
    // eslint-disable-next-line prettier/prettier
      return 'ERROR: File doesn\'t exist.'
  }

  if (!args.path.includes('.')) {
    // requested preview of directory
    const children = await fsAsync.readdir(args.path)
    return '|- ' + children.join('\n|- ')
  }

  const fileStats = fsSync.statSync(args.path)

  if (fileStats.size > config.MAX_PREVIEW_FILE_SIZE) {
    return 'ERROR: File too big to preview'
  }

  if (args.type == 'text') {
    const fileBuffer = await fsAsync.readFile(args.path)
    return fileBuffer.toString('utf-8')
  }

  if (args.type == 'img') {
    const fileBuffer = await fsAsync.readFile(args.path)
    return fileBuffer.toString('base64')
  }

  return 'ERROR'
})

handleRequest('requestFileEdit', async (_ev, args) => {
  try {
    await fsAsync.writeFile(args.filePath, args.updatedText)
    return { success: true }
  } catch (error) {
    return { success: false }
  }
})

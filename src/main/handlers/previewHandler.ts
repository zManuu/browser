import { handleRequest } from '../ipc'
import * as fsSync from 'fs'
import * as fsAsync from 'fs/promises'
import config from '../../shared/Config'
import { logger } from '../browser'
import { isFileOrDirectory } from '../utils/fsUtils'

const LOG_TAG = '[Preview]'

handleRequest('requestPreview', async (_ev, args) => {
  logger.info(`${LOG_TAG} Requesting preview for >"${args.path}"< ...`)

  if (!fsSync.existsSync(args.path)) {
    logger.warn(`${LOG_TAG} Requested preview for non-existent file / directory >"${args.path}"<.`)
    // eslint-disable-next-line prettier/prettier
    return { err: 'file_not_found' }
  }

  if (isFileOrDirectory(args.path) === 'directory') {
    // requested preview of directory
    const children = await fsAsync.readdir(args.path)
    return children.length > 0 ? '|- ' + children.join('\n|- ') : ''
  }

  const fileStats = fsSync.statSync(args.path)

  if (fileStats.size > config.MAX_PREVIEW_FILE_SIZE) {
    logger.warn(
      `${LOG_TAG} Requested preview for file >"${args.path}"< too big (${fileStats.size} bytes).`
    )
    return { err: 'file_too_big' }
  }

  if (args.type == 'text') {
    const fileBuffer = await fsAsync.readFile(args.path)
    return fileBuffer.toString('utf-8')
  }

  if (args.type == 'img') {
    const fileBuffer = await fsAsync.readFile(args.path)
    return fileBuffer.toString('base64')
  }

  return { err: 'unknown_type' }
})

handleRequest('requestFileEdit', async (_ev, args) => {
  try {
    await fsAsync.writeFile(args.filePath, args.updatedText)
    return { success: true }
  } catch (error) {
    return { success: false }
  }
})

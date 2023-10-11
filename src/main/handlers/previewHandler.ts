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
    logger.info(
      `${LOG_TAG} Requested preview of directory >"${args.path}"< responding with ${children.length} children.`
    )
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
    logger.info(
      `${LOG_TAG} Requested preview for text file >"${args.path}"<, returning ${fileBuffer.length} bytes.`
    )
    return fileBuffer.toString('utf-8')
  }

  if (args.type == 'img') {
    const imageUrl = `file:///${args.path}`
    logger.info(`${LOG_TAG} Requested preview for image >"${args.path}"<, returning "${imageUrl}".`)
    return imageUrl
  }

  logger.warn(
    `${LOG_TAG} Requested preview for unknown type "${args.type}" (file: >"${args.path}"<).`
  )
  return { err: 'unknown_type' }
})

handleRequest('requestFileEdit', async (_ev, args) => {
  logger.info(`${LOG_TAG} Requesting file edit for >"${args.filePath}"< ...`)
  try {
    await fsAsync.writeFile(args.filePath, args.updatedText)
    logger.info(`${LOG_TAG} Requested file edit for >"${args.filePath}"< was successfull.`)
    return { success: true }
  } catch (error) {
    logger.warn(`${LOG_TAG} Requested file edit for >"${args.filePath}"< failed.`)
    return { success: false }
  }
})

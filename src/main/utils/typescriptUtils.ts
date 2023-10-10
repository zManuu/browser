import { exec } from 'child_process'
import { join } from 'path'
import { generateUUID } from './uuidUtils'
import * as util from 'util'
import { logger } from '../browser'

const execPromise = util.promisify(exec)
const LOG_TAG = '[TypeScript]'

async function compileTypescriptFile(path: string, forAutoRun = false): Promise<string | boolean> {
  logger.info(`${LOG_TAG} Compiling ts-script >"${path}"< with autoRun ${forAutoRun}  ...`)
  const fileName = path.split('\\').pop()
  const fileDirectory = path.split('\\').slice(0, -1).join('\\')

  if (!fileName) {
    logger.warn(`${LOG_TAG} Could not determine file name from path >"${path}"<.`)
    return false
  }

  const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.')

  const directory = forAutoRun
    ? join(process.env.TEMP as string, 'browser-temp', 'TS')
    : fileDirectory

  const outFileName = forAutoRun
    ? `${directory}\\${fileNameWithoutExtension}-${generateUUID()}.js`
    : `${directory}\\${fileNameWithoutExtension}.js`

  try {
    // todo: module amd weird compiling
    const { stderr } = await execPromise(`tsc "${path}" --outFile "${outFileName}" --module amd`)

    if (stderr) {
      logger.error(`${LOG_TAG} Stderr while compiling ts-script >"${path}"<.`)
      return false
    }

    logger.info(`${LOG_TAG} Finished compiling ts-script >"${path}"<.`)
    return outFileName
  } catch (error) {
    logger.error(`${LOG_TAG} Error while compiling ts-script >"${path}"<.`)
    return false
  }
}

async function runTypescriptFile(path: string) {
  logger.info(`${LOG_TAG} Starting ts-script >"${path}"< ...`)
  try {
    const compiledPath = await compileTypescriptFile(path, true)
    if (!compiledPath) return

    await execPromise(`node "${compiledPath}"`)
  } catch (e) {
    logger.warn(`${LOG_TAG} Error while compiling / running ts-script >"${path}"<.`)
  }
}

export { compileTypescriptFile, runTypescriptFile }

import { createLogger, transports, format, Logger } from 'winston'
import ForwardTransport from './utils/logForward'

export const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'DD.MM.YYYY | HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      // when changing this format, also change the format in the logForward.ts file
      return `${timestamp} [${level}] ${message}`
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' }),
    new ForwardTransport()
  ]
})

export function enable() {
  logger.info('enabling the browser window')

  import('./handlers/browseHandler')
  import('./handlers/contextMenuHandler')
  import('./handlers/previewHandler')
}

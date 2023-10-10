import { createLogger, transports, format, Logger } from 'winston'
import ForwardTransport from './utils/logForward'
import Config from '../shared/Config'

export const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: Config.WINSTON_TIME_FORMAT }),
    format.printf(({ timestamp, level, message }) => {
      return Config.WINSTON_LOG_FORMAT.replace('{timestamp}', timestamp)
        .replace('{level}', level)
        .replace('{message}', message)
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' }),
    new ForwardTransport()
  ]
})

export function enable() {
  logger.info('enabling...')

  import('./handlers/browseHandler')
  import('./handlers/contextMenuHandler')
  import('./handlers/previewHandler')
}

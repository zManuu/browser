import Transport from 'winston-transport'
import { send } from '../ipc'

export type LogRecord = {
  level: 'debug' | 'info' | 'warn' | 'error'
  message: string
  timestamp: string
}

export default class extends Transport {
  constructor(opts?: Transport.TransportStreamOptions) {
    super(opts)
  }

  public log(data: LogRecord, next: () => void) {
    send('log', `${data.timestamp} [${data.level}] ${data.message}`)
    next()
  }
}

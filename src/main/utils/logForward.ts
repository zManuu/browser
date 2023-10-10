import Transport from 'winston-transport'
import { send } from '../ipc'
import LogRecord from '../../shared/LogRecord'

export default class extends Transport {
  constructor(opts?: Transport.TransportStreamOptions) {
    super(opts)
  }

  public log(data: LogRecord, next: () => void) {
    send('log', data)
    next()
  }
}

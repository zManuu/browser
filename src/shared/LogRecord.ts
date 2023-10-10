export const logLevels = ['info', 'warn', 'error', 'debug'] as const

export type LogLevel = (typeof logLevels)[number]

export default interface LogRecord {
  timestamp: string
  level: LogLevel
  message: string
}

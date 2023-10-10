import { is } from '@electron-toolkit/utils'
import { handleRequest } from '../ipc'

handleRequest('buildType', () => {
  return is.dev ? 'dev' : 'build'
})

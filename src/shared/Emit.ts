import { type Directory } from './Directory'
import { FsEntry } from './FsEntry'

/**
 * A request that is sent by the window and responded to by the node env
 */
type WindowRequest = {
  requestDirectory: {
    reqArgs: string
    resArgs: {
      directory: Directory
      fsEntries: FsEntry[]
    }
  }
}

type WindowToNode = {
  openFile: string
}

export type { WindowRequest, WindowToNode }

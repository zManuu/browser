import { type Directory } from './Directory'
import { FsEntry } from './FsEntry'
import { PreviewType } from './PreviewType'

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
  requestPreview: {
    reqArgs: {
      path: string
      type: PreviewType
    }
    resArgs: string
  }
}

type WindowToNode = {
  openFile: string
}

export type { WindowRequest, WindowToNode }

import { type Directory } from './Directory'
import { FsEntry } from './FsEntry'
import { PreviewType } from './PreviewType'

/**
 * A request that is sent by the window and responded to by the node env.
 * Has to have 2 props: reqArgs and resArgs.
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
  requestFileEdit: {
    reqArgs: {
      filePath: string
      updatedText: string
    }
    resArgs: {
      success: boolean
    }
  }
}

type WindowToNode = {
  openFile: string
}

export type { WindowRequest, WindowToNode }

import { type Directory } from './Directory'
import { FsEntry } from './FsEntry'
import { PreviewType } from './PreviewType'
import { LogRecord } from './LogRecord'

const contextMenuTypes = [
  'open.open',
  'open.vsc',
  'open.intelij',
  'open.terminal',
  'edit.rename',
  'edit.clear',
  'edit.delete',
  'create.directory',
  'create.txt',
  'create.gitignore',
  'create.json',
  'create.xml',
  'create.css',
  'create.vue',
  'create.java',
  'create.js',
  'create.html',
  'ts.run',
  'ts.compile',
  'js.run',
  'mjs.run',
  'gitignore.addrecommended'
] as const

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
    resArgs: string | { err: 'file_too_big' | 'file_not_found' | 'unknown_type' }
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
  contextMenuAction: {
    fsEntryPath: string
    type: (typeof contextMenuTypes)[number]
    params: { inputValue: string; selectedTemplate?: string } | undefined
  }
}

type NodeToWindow = {
  log: LogRecord
}

export type { WindowRequest, WindowToNode, contextMenuTypes, NodeToWindow }

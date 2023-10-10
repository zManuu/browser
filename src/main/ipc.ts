import { mainWindow } from '.'
import { NodeToWindow, WindowRequest, WindowToNode } from '../shared/Emit'
import { IpcMainEvent, IpcMainInvokeEvent, ipcMain } from 'electron'

type RequestHandler<T extends keyof WindowRequest> = (
  event: IpcMainInvokeEvent,
  args: WindowRequest[T]['reqArgs']
) => Promise<WindowRequest[T]['resArgs']>

async function handleRequest<T extends keyof WindowRequest>(
  key: T,
  listener: RequestHandler<T>
): Promise<void> {
  ipcMain.handle(key, listener)
}

function handleEmit<T extends keyof WindowToNode>(
  key: T,
  listener: (event: IpcMainEvent, args: WindowToNode[T]) => void
) {
  ipcMain.on(key, listener)
}

function send<T extends keyof NodeToWindow>(key: T, args: NodeToWindow[T]) {
  mainWindow?.webContents.send(key, args)
}

export { handleRequest, handleEmit, send }

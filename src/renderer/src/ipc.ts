import type { NodeToWindow, WindowRequest, WindowToNode } from '@shared/Emit'

async function request<T extends keyof WindowRequest>(
  key: T,
  args: WindowRequest[T]['reqArgs']
): Promise<WindowRequest[T]['resArgs']> {
  console.log(`[IPC] Requesting ${key} with args ${JSON.stringify(args)}.`)
  return window.electron.ipcRenderer.invoke(key, args)
}

function send<T extends keyof WindowToNode>(key: T, args: WindowToNode[T]) {
  console.log(`[IPC] Sending ${key} with args ${JSON.stringify(args)}.`)
  window.electron.ipcRenderer.send(key, args)
}

function on<T extends keyof NodeToWindow>(key: T, listener: (args: NodeToWindow[T]) => void) {
  console.log(`[IPC] Adding listener for ${key}.`)
  window.electron.ipcRenderer.on(key, (_ev, args) => {
    listener(args)
  })
}

export { request, send, on }

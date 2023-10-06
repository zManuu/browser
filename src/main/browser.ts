export function enable() {
  console.log('enabling the browser window')

  import('./handlers/browseHandler')
  import('./handlers/contextMenuHandler')
  import('./handlers/previewHandler')
}

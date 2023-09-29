import { statSync } from 'fs'
import { basename } from 'path'

export type FsEntry = {
  type: 'file' | 'directory'
  name: string
  parentPath: string
  sizeInKb: number | 'N/A'
  isHidden: boolean
}

export function isHidden(fileOrDirPath: string) {
  // Get the base name of the file or directory
  const baseName = basename(fileOrDirPath)

  try {
    // Check if the file or directory has the hidden attribute on Windows
    const stats = statSync(fileOrDirPath)

    if (process.platform === 'win32') {
      const isHidden = !!(stats && stats.mode & 0x02) // Check if the 2nd bit (hidden attribute) is set
      return isHidden
    }

    // For non-Windows systems, check if the name starts with a dot (Unix-style hidden)
    return baseName.startsWith('.')
  } catch (error) {
    // Handle any errors, such as file not found
    console.error(`Error checking if ${baseName} is hidden: ${error}`)
    return false
  }
}

export function cleanPath(path: string) {
  const directories = path.split(/\\+/).filter((e) => e != '')
  return directories.join('\\')
}

export function encodePath(path: string) {
  const directories = path
    .split(/\\+/)
    .filter((e) => e != '')
    .map((e) => encodeURIComponent(e))
  return directories.join('\\')
}

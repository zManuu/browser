import { FsEntry } from './FsEntry'

export interface Directory extends FsEntry {}

export function getParentDirectory(childDirectory: string): string | false {
  // splits on all \\ (no matter how many)
  const directories = childDirectory.split(/\\+/).filter((e) => e != '')
  directories.pop()
  if (directories.length === 0) return false
  return directories.join('\\') + '\\'
}

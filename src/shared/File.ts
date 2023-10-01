import { FsEntry } from './FsEntry'

export interface File extends FsEntry {}

export const fileTypes = {
  txt: 'txt',
  js: 'js',
  ts: 'ts',
  vue: 'vue',
  java: 'java',
  class: 'class',
  gitignore: 'gitignore',
  json: 'json',
  svg: 'svg',
  png: 'png',
  jpg: 'jpg',
  yml: 'yml',
  yaml: 'yaml',
  xml: 'xml'
} as const

export type fileType = keyof typeof fileTypes

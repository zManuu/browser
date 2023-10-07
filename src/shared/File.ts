import { FsEntry } from './FsEntry'

export interface File extends FsEntry {}

export const fileTypes = {
  txt: 'txt',
  js: 'js',
  mjs: 'mjs',
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
  xml: 'xml',
  ico: 'ico',
  css: 'css',
  html: 'html'
} as const

export type fileType = keyof typeof fileTypes

export const templates: Map<fileType, Map<string, string>> = new Map([
  [
    'vue',
    new Map<string, string>([
      ['Hello world', '<template>\nHello World!\n</template>'],
      [
        'JS',
        '<template>\nHello World!\n</template>\n<script lang="js">\nexport default {\n\n}\n</script>'
      ],
      ['JS setup', '<template>\nHello World!\n</template>\n<script lang="js" setup>\n\n</script>'],
      [
        'TS',
        '<template>\nHello World!\n</template>\n<script lang="ts">\nexport default defineComponent({\n\n})\n</script>'
      ],
      ['TS setup', '<template>\nHello World!\n</template>\n<script lang="ts" setup>\n\n</script>']
    ])
  ],
  [
    'css',
    new Map<string, string>([
      ['Tailwind', '@tailwind base;\n@tailwind components;\n@tailwind utilities;']
    ])
  ]
])

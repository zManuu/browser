<template>
  <div class="flex flex-col w-full select-none opacity-75 hover:opacity-100 bg-slate-800">
    <div v-for="(itemCategory, itemCategoryIndex) in menuItems.keys()" :key="itemCategoryIndex">
      <h1 class="my-3 font-semibold text-xl text-center">{{ itemCategory }}</h1>
      <div
        v-for="(item, itemIndex) in menuItems.get(itemCategory)"
        :key="itemIndex"
        class="cursor-pointer hover:bg-slate-600 p-3 flex items-center justify-start space-x-3"
        @click="handleItemClick(item)"
      >
        <img v-if="item.icon" :src="item.icon" class="w-[1.5rem]" />
        <img v-if="item.icon2" :src="item.icon2" class="w-[1.5rem]" />
        <h1>{{ item.name }}</h1>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { FsEntry } from '@shared/FsEntry'
import { PropType, defineComponent } from 'vue'
import * as icons from '@renderer/icons'
import { contextMenuTypes } from '@shared/Emit'
import { send } from '@renderer/ipc'

interface IMenuItem {
  name: string
  icon?: string
  icon2?: string
  type: (typeof contextMenuTypes)[number]
  requiresInput?: boolean
}

export default defineComponent({
  props: {
    fsEntry: {
      type: Object as PropType<FsEntry>,
      required: true
    }
  },
  computed: {
    menuItems() {
      const itemMap = new Map<string, IMenuItem[]>()

      itemMap.set('Open', [
        { name: 'Open', icon: icons.open, type: 'open.open' },
        { name: 'Open in Visual Studio Code', icon: icons.vsc, type: 'open.vsc' },
        { name: 'Open in InteliJ', icon: icons.intelij, type: 'open.intelij' }
      ])

      itemMap.set('Edit', [
        { name: 'Rename', icon: icons.rename, type: 'edit.rename', requiresInput: true },
        { name: 'Delete', icon: icons.deletee, type: 'edit.delete' },
        { name: 'Clear', icon: icons.clear, type: 'edit.clear' }
      ])

      switch (this.fsEntry.type) {
        case 'directory':
          itemMap
            .get('Open')
            ?.push({ name: 'Open in Terminal', icon: icons.terminal, type: 'open.terminal' })

          itemMap.set('Create', [
            {
              name: 'Directory',
              icon: icons.create_directory,
              type: 'create.directory',
              requiresInput: true
            },
            { name: 'Text File', icon: icons.file_txt, type: 'create.txt', requiresInput: true },
            { name: 'CSS File', icon: icons.file_css, type: 'create.css', requiresInput: true },
            { name: '.gitignore File', icon: icons.file_gitignore, type: 'create.gitignore' },
            { name: 'HTML File', icon: icons.file_html, type: 'create.html', requiresInput: true },
            { name: 'Java File', icon: icons.file_java, type: 'create.java', requiresInput: true },
            { name: 'JS File', icon: icons.javaScript, type: 'create.js', requiresInput: true },
            { name: 'JSON File', icon: icons.file_json, type: 'create.json', requiresInput: true },
            { name: 'Vue File', icon: icons.file_vue, type: 'create.vue', requiresInput: true },
            { name: 'XML File', icon: icons.file_xml, type: 'create.xml', requiresInput: true }
          ])
          break
        case 'file': {
          const fileType = this.fsEntry.name.split('.').pop()
          switch (fileType) {
            case 'ts':
              itemMap.set('TS-Specific', [
                {
                  name: 'Compile',
                  icon: icons.typescript,
                  icon2: icons.compile,
                  type: 'ts.compile'
                },
                { name: 'Run', icon: icons.typescript, icon2: icons.run, type: 'ts.run' }
              ])
              break
            case 'js':
              itemMap.set('JS-Specific', [
                { name: 'Run', icon: icons.javaScript, icon2: icons.run, type: 'js.run' }
              ])
              break
            case 'mjs':
              itemMap.set('MJS-Specific', [
                { name: 'Run', icon: icons.javaScript, icon2: icons.run, type: 'mjs.run' }
              ])
              break
            case 'gitignore':
              itemMap.set('Gitignore-Specific', [
                {
                  name: 'Add recommended settings',
                  icon: icons.file_gitignore,
                  type: 'gitignore.addrecommended'
                }
              ])
              break
          }
          break
        }
      }

      return itemMap
    }
  },
  methods: {
    handleItemClick(item: IMenuItem) {
      if (item.requiresInput) {
        // TODO: input
        console.warn(`Item ${item.type} requires input, not implemented yet => abording.`)
        return
      }

      send('contextMenuAction', {
        fsEntryPath: `${this.fsEntry.parentPath}\\${this.fsEntry.name}`,
        type: item.type,
        param: undefined
      })
    }
  }
})
</script>

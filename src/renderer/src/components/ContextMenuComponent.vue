<template>
  <div class="flex flex-col w-max select-none opacity-75 hover:opacity-100 bg-slate-700">
    <div v-for="(item, index) in getMenuItems" :key="index">
      <div
        v-if="typeof item === 'object'"
        class="cursor-pointer hover:bg-slate-600 p-3 flex items-center justify-start space-x-3"
        @click="item.onClick"
      >
        <img v-if="item.icon" :src="item.icon" class="w-[1.5rem]" />
        <h1>{{ item.name }}</h1>
      </div>
      <h1 v-else class="my-3 font-semibold text-xl text-center">{{ item }}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { FsEntry } from '@shared/FsEntry'
import { PropType, defineComponent } from 'vue'
import * as icons from '@renderer/icons'

interface IMenuItem {
  name: string
  icon?: string
  onClick?: () => void
}

type MenuItem = IMenuItem | string

export default defineComponent({
  props: {
    fsEntry: {
      type: Object as PropType<FsEntry>,
      required: true
    }
  },
  computed: {
    getMenuItems() {
      const items: MenuItem[] = [
        'Open',
        {
          name: 'Open',
          icon: icons.open
        },
        {
          name: 'Open in Visual Studio Code',
          icon: icons.vsc
        },
        {
          name: 'Open in InteliJ',
          icon: icons.intelij
        },
        'Edit',
        {
          name: 'Rename',
          icon: icons.rename
        },
        {
          name: 'Delete',
          icon: icons.deletee
        },
        'Create',
        {
          name: 'Folder',
          icon: icons.create_directory
        },
        {
          name: 'Text File',
          icon: icons.file_txt
        },
        {
          name: 'CSS File',
          icon: icons.file_css
        },
        {
          name: '.gitignore File',
          icon: icons.file_gitignore
        },
        {
          name: 'HTML File',
          icon: icons.file_html
        },
        {
          name: 'Java File',
          icon: icons.file_java
        },
        {
          name: 'JS File',
          icon: icons.file_javaScript
        },
        {
          name: 'JSON File',
          icon: icons.file_json
        },
        {
          name: 'Vue File',
          icon: icons.file_vue
        },
        {
          name: 'XML File',
          icon: icons.file_xml
        }
      ]

      switch (this.fsEntry.type) {
        case 'directory':
          break
        case 'file':
          break
      }

      return items
    }
  }
})
</script>

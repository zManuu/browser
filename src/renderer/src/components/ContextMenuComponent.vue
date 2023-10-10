<template>
  <div
    class="flex flex-col w-full select-none opacity-75 hover:opacity-100 bg-slate-800 duration-300"
  >
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
  <ConfirmComponent
    ref="cc"
    @confirm="
      (inputValue: string, selectedTemplate?: string) =>
        handleItemClick(selectedItem, { inputValue, selectedTemplate })
    "
    @cancel="selectedItem = undefined"
  />
</template>
<script lang="ts">
import { FsEntry } from '@shared/FsEntry'
import { PropType, defineComponent } from 'vue'
import * as icons from '@renderer/icons'
import { contextMenuTypes } from '@shared/Emit'
import { send } from '@renderer/ipc'
import ConfirmComponent, { ConfirmComponentType } from './ConfirmComponent.vue'
import { templates } from '@shared/File'

interface IMenuItem {
  name: string
  icon?: string
  icon2?: string
  type: (typeof contextMenuTypes)[number]
  inputType?: ItemInputType
  inputTitle?: string
  inputPlaceholder?: string
  inputContent?: string
  inputTemplates?: Map<string, string>
}

type ItemInputType = 'confirm' | 'text' | 'text&template'

export default defineComponent({
  components: { ConfirmComponent },
  props: {
    fsEntry: {
      type: Object as PropType<FsEntry>,
      required: true
    }
  },
  data() {
    return {
      selectedItem: undefined as IMenuItem | undefined
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
        {
          name: 'Rename',
          icon: icons.rename,
          type: 'edit.rename',
          inputType: 'text',
          inputPlaceholder: 'New name',
          inputContent: 'Please enter a new name.',
          inputTitle: 'Rename'
        },
        {
          name: 'Delete',
          icon: icons.deletee,
          type: 'edit.delete',
          inputType: 'confirm',
          inputContent: 'Are you sure you want to delete this file / directory?',
          inputTitle: 'Delete'
        },
        {
          name: 'Clear',
          icon: icons.clear,
          type: 'edit.clear',
          inputType: 'confirm',
          inputContent: 'Are you sure you want to clear this file / directory?',
          inputTitle: 'Clear'
        }
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
              inputType: 'text',
              inputContent: 'Please enter the name of the new directory.',
              inputTitle: 'Directory name',
              inputPlaceholder: 'Directory name'
            },
            {
              name: 'Text File',
              icon: icons.file_txt,
              type: 'create.txt',
              inputType: 'text',
              inputContent: 'Please enter the name of the new text file.',
              inputTitle: 'File name',
              inputPlaceholder: 'File name'
            },
            {
              name: 'CSS File',
              icon: icons.file_css,
              type: 'create.css',
              inputType: 'text&template',
              inputContent: 'Please enter the name of the new CSS file.',
              inputTitle: 'File name',
              inputTemplates: templates.get('css'),
              inputPlaceholder: 'File name'
            },
            { name: '.gitignore File', icon: icons.file_gitignore, type: 'create.gitignore' },
            {
              name: 'HTML File',
              icon: icons.file_html,
              type: 'create.html',
              inputType: 'text&template',
              inputContent: 'Please enter the name of the new HTML file.',
              inputTitle: 'File name',
              inputTemplates: templates.get('html'),
              inputPlaceholder: 'File name'
            },
            {
              name: 'Java File',
              icon: icons.file_java,
              type: 'create.java',
              inputType: 'text&template',
              inputContent: 'Please enter the name of the new Java file.',
              inputTitle: 'File name',
              inputTemplates: templates.get('java'),
              inputPlaceholder: 'File name'
            },
            {
              name: 'JS File',
              icon: icons.javaScript,
              type: 'create.js',
              inputType: 'text&template',
              inputContent: 'Please enter the name of the new JS file.',
              inputTitle: 'File name',
              inputTemplates: templates.get('js'),
              inputPlaceholder: 'File name'
            },
            {
              name: 'JSON File',
              icon: icons.file_json,
              type: 'create.json',
              inputType: 'text&template',
              inputContent: 'Please enter the name of the new JSON file.',
              inputTitle: 'File name',
              inputTemplates: templates.get('json'),
              inputPlaceholder: 'File name'
            },
            {
              name: 'Vue File',
              icon: icons.file_vue,
              type: 'create.vue',
              inputType: 'text&template',
              inputContent: 'Please enter the name of the new Vue file.',
              inputTitle: 'File name',
              inputTemplates: templates.get('vue'),
              inputPlaceholder: 'File name'
            },
            {
              name: 'XML File',
              icon: icons.file_xml,
              type: 'create.xml',
              inputType: 'text&template',
              inputContent: 'Please enter the name of the new XML file.',
              inputTitle: 'File name',
              inputTemplates: templates.get('xml'),
              inputPlaceholder: 'File name'
            }
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
    getCC() {
      return this.$refs.cc as ConfirmComponentType
    },
    handleItemClick(item?: IMenuItem, params?: { inputValue: string; selectedTemplate?: string }) {
      if (!item) {
        // eslint-disable-next-line prettier/prettier
        console.warn('Couldn\'t handle itemClick because passed item is undefined.')
        return
      }

      const cc = this.getCC()
      if (item.inputType && !this.selectedItem) {
        this.selectedItem = item
        cc.open(
          item.icon || item.icon2 || icons.question,
          item.inputTitle || item.name,
          item.inputContent || item.name,
          item.inputType == 'text' || item.inputType == 'text&template',
          item.inputPlaceholder,
          item.inputType == 'text&template',
          item.inputTemplates
        )
        return
      }

      send('contextMenuAction', {
        fsEntryPath: `${this.fsEntry.parentPath}\\${this.fsEntry.name}`,
        type: item.type,
        params
      })
      this.selectedItem = undefined
    }
  }
})
</script>

<template>
  <div
    class="flex flex-col w-full select-none opacity-75 hover:opacity-100 bg-slate-800 p-3 duration-300"
  >
    <div class="flex w-full justify-between items-center">
      <h1 class="font-semibold text-xl">Preview: {{ fsEntry.name }}</h1>
      <div
        v-if="previewType == 'text'"
        class="bg-slate-900 p-5 rounded-xl shadow-2xl opacity-70 hover:opacity-100 duration-300 w-[25vw]"
      >
        <div class="flex space-x-2 m-auto w-max">
          <input id="editContentCheckbox" v-model="isEditable" type="checkbox" />
          <label for="editContentCheckbox" class="leading-4 text-lg font-medium"
            >Edit content</label
          >
        </div>
        <!-- <button class="bg-slate-800 hover:border-2 hover:border-2 " v-if="isEditable" @click="saveChanges">Save changes</button> -->
        <button
          v-if="isEditable"
          class="flex items-center space-x-1 bg-slate-800 p-3 rounded hover:bg-slate-950 hover:border-2 border-slate-800 duration-300 mt-3 w-max m-auto"
          @click="saveChanges"
        >
          <img :src="saveIcon" class="w-5" />
          <h1>Save & Continue</h1>
        </button>
      </div>
    </div>
    <p v-if="previewType == 'text' && !isEditable" class="whitespace-pre break-words">
      {{ previewValue }}
    </p>
    <textarea
      v-if="previewType == 'text' && isEditable && fsEntry.type == 'file'"
      v-model="previewValue"
      class="whitespace-pre break-words bg-inherit h-screen"
    />
    <img v-if="previewType == 'img'" :src="imageSrc" class="max-w-[75%] m-auto" />
  </div>
</template>
<script lang="ts">
import { request } from '@renderer/ipc'
import { FsEntry } from '@shared/FsEntry'
import { PreviewType } from '@shared/PreviewType'
import { PropType, defineComponent } from 'vue'
import * as icons from '@renderer/icons'

export default defineComponent({
  props: {
    fsEntry: {
      type: Object as PropType<FsEntry>,
      required: true
    }
  },
  data() {
    return {
      previewValue: '',
      isEditable: false,
      buildType: undefined as 'dev' | 'build' | undefined,
      saveIcon: icons.save
    }
  },
  computed: {
    previewType(): PreviewType {
      if (this.fsEntry.type == 'directory') return 'text'

      const fileType = this.fsEntry.name.split('.').pop()

      switch (fileType) {
        case 'png':
        case 'jpg':
        case 'svg':
        case 'ico':
          return 'img'
      }

      return 'text'
    },
    imageSrc() {
      if (!this.buildType) return ''
      return this.buildType == 'dev' ? icons.placeholder : this.previewValue
    }
  },
  watch: {
    fsEntry() {
      this.load()
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      const type = this.previewType
      const path = `${this.fsEntry.parentPath}\\${this.fsEntry.name}`
      request('requestPreview', { path, type }).then((res) => {
        if (typeof res === 'object') return
        this.previewValue = res
      })

      request('buildType', undefined).then((res) => (this.buildType = res))
    },
    async saveChanges() {
      const filePath = `${this.fsEntry.parentPath}\\${this.fsEntry.name}`
      const updatedText = this.previewValue
      const result = await request('requestFileEdit', { filePath, updatedText })

      if (!result.success) {
        // reload file content
        this.load()
      }
    }
  }
})
</script>

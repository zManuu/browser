<template>
  <div
    class="flex flex-col w-full select-none opacity-75 hover:opacity-100 bg-slate-800 p-3 duration-300"
  >
    <div class="flex w-full justify-between items-center">
      <h1 class="font-semibold text-xl">Preview: {{ fsEntry.name }}</h1>
      <div v-if="previewType == 'text'" class="flex flex-col">
        <Toggle v-model="isEditable" off-label="Edit" on-label="Edit" />
        <button @click="saveChanges">Save changes</button>
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
    <img v-if="previewType == 'img'" :src="previewValue" />
  </div>
</template>
<script lang="ts">
import { request } from '@renderer/ipc'
import { FsEntry } from '@shared/FsEntry'
import { PreviewType } from '@shared/PreviewType'
import { PropType, defineComponent } from 'vue'
import Toggle from '@vueform/toggle'

export default defineComponent({
  components: { Toggle },
  props: {
    fsEntry: {
      type: Object as PropType<FsEntry>,
      required: true
    }
  },
  data() {
    return {
      previewValue: '',
      isEditable: false
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
    }
  },
  watch: {
    fsEntry() {
      this.loadValue()
    }
  },
  created() {
    this.loadValue()
  },
  methods: {
    loadValue() {
      const type = this.previewType
      const path = `${this.fsEntry.parentPath}\\${this.fsEntry.name}`
      request('requestPreview', { path, type }).then((res) => {
        if (typeof res === 'object') return
        this.previewValue = res
      })
    },
    async saveChanges() {
      const filePath = `${this.fsEntry.parentPath}\\${this.fsEntry.name}`
      const updatedText = this.previewValue
      const result = await request('requestFileEdit', { filePath, updatedText })

      if (!result.success) {
        // reload file content
        this.loadValue()
      }
    }
  }
})
</script>

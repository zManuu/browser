<template>
  <div class="flex flex-col w-full select-none opacity-75 hover:opacity-100 bg-slate-800 p-3">
    <h1 class="font-semibold text-xl">Preview: {{ fsEntry.name }}</h1>
    <p v-if="previewType == 'text'" class="whitespace-pre break-words">
      {{ previewValue }}
    </p>
    <img v-if="previewType == 'img'" :src="previewValue" />
  </div>
</template>
<script lang="ts">
import { request } from '@renderer/ipc'
import { FsEntry } from '@shared/FsEntry'
import { PreviewType } from '@shared/PreviewType'
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  props: {
    fsEntry: {
      type: Object as PropType<FsEntry>,
      required: true
    }
  },
  data() {
    return {
      previewValue: ''
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
      request('requestPreview', { path, type }).then((res) => (this.previewValue = res))
    }
  }
})
</script>

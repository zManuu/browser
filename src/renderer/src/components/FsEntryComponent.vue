<template>
  <div
    class="w-full h-min bg-slate-700 border-2 border-slate-600 p-3 flex justify-start items-center space-x-5 cursor-pointer hover:bg-slate-600"
    :class="{ 'bg-slate-800': fsEntry.isHidden }"
    @click="handleClick"
  >
    <fa :icon="fsEntry.type == 'directory' ? 'folder' : 'file'" />
    <h1>{{ fsEntry.name }}</h1>
    <!-- <h1>{{ fsEntry.sizeInKb }}kb</h1> -->
  </div>
</template>
<script lang="ts">
import type { FsEntry } from '@shared/FsEntry'
import { type PropType, defineComponent } from 'vue'
import { send } from '@renderer/ipc'

export default defineComponent({
  props: {
    fsEntry: {
      type: Object as PropType<FsEntry>,
      required: true
    }
  },
  methods: {
    handleClick() {
      const directoryName = this.fsEntry.parentPath
      const path = `${directoryName}\\${this.fsEntry.name}`

      switch (this.fsEntry.type) {
        case 'directory':
          console.log(`Navigating to directory ${path}.`)
          this.$router.push(`/browse/${path}`)
          break
        case 'file':
          console.log(`Opening file ${path}.`)
          send('openFile', path)
          break
      }
    }
  }
})
</script>

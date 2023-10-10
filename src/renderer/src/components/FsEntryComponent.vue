<template>
  <div
    class="w-full h-min bg-slate-700 border-2 border-slate-600 p-3 flex justify-start items-center space-x-5 cursor-pointer hover:bg-slate-600 select-none"
    :class="{ 'bg-slate-800': fsEntry.isHidden }"
    @click="handleClick"
  >
    <img class="w-5" :src="getIcon()" />
    <h1>{{ fsEntry.name }}</h1>
    <!-- <h1>{{ fsEntry.sizeInKb }}kb</h1> -->
  </div>
</template>
<script lang="ts">
import type { FsEntry } from '@shared/FsEntry'
import { type PropType, defineComponent } from 'vue'
import * as icons from '@renderer/icons'

export default defineComponent({
  props: {
    fsEntry: {
      type: Object as PropType<FsEntry>,
      required: true
    }
  },
  emits: ['handleClick'],
  methods: {
    handleClick() {
      this.$emit('handleClick')
    },
    getIcon() {
      if (this.fsEntry.type == 'directory') return icons.directory

      const fileExt = this.fsEntry.name.split('.').pop()

      if (!fileExt) {
        console.warn(`Could not determine file extension for ${this.fsEntry.name}.`)
        return icons.file
      }

      if (fileExt in icons) return icons[fileExt]
      if (`file_${fileExt}` in icons) return icons[`file_${fileExt}`]

      return icons.file
    }
  }
})
</script>

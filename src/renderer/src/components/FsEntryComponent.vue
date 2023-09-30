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
    }
  }
})
</script>

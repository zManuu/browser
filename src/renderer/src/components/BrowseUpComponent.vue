<template>
  <div
    class="w-full h-min bg-slate-700 border-2 border-slate-600 p-3 flex justify-start items-center space-x-5 cursor-pointer hover:bg-slate-600 select-none"
    @click="handleClick"
  >
    <h1>..</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['goUp'],
  methods: {
    handleClick() {
      this.$emit('goUp')
    }
  }
})
</script>

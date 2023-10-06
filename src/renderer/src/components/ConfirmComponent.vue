<template>
  <div
    v-if="visible"
    class="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center"
  >
    <div class="bg-slate-700 py-3 px-5 class space-y-3 rounded">
      <div class="flex justify-start items-center space-x-1 border-b-2 w-max px-1 pb-1">
        <img :src="icon" class="w-6 h-6" />
        <h1 class="font-semibold text-2xl">{{ title }}</h1>
      </div>
      <p class="text-gray-400">{{ content }}</p>
      <div class="flex justify-center items-center space-x-3">
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          @click="cancel"
        >
          Cancel
        </button>
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          @click="confirm"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['confirm', 'cancel'],
  data() {
    return {
      icon: '',
      visible: false,
      title: '',
      content: ''
    }
  },
  methods: {
    open(icon: string, title: string, content: string) {
      if (this.visible) {
        console.warn('confirm-component already open!')
        return
      }

      this.icon = icon
      this.title = title
      this.content = content
      this.visible = true
    },
    cancel() {
      this.visible = false
      this.$emit('cancel')
    },
    confirm() {
      this.visible = false
      this.$emit('confirm')
    }
  }
})
</script>

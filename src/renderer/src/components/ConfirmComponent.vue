<template>
  <div
    v-if="visible"
    class="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center"
  >
    <div class="bg-slate-700 py-3 px-5 class space-y-3 rounded">
      <div
        class="flex justify-start items-center space-x-1 border-b-2 border-slate-500 w-max px-1 pb-1"
      >
        <img :src="icon" class="w-6 h-6" />
        <h1 class="font-semibold text-2xl">{{ title }}</h1>
      </div>
      <p class="text-gray-400">{{ content }}</p>
      <input
        v-if="hasInput"
        ref="input"
        v-model="inputValue"
        type="text"
        :placeholder="inputPlaceholder"
        class="bg-slate-800 px-3 py-1.5 w-full shadow rounded"
      />
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
      content: '',
      hasInput: false,
      inputPlaceholder: '',
      inputValue: undefined
    }
  },
  methods: {
    open(icon: string, title: string, content: string, hasInput = false, inputPlaceholder = '') {
      if (this.visible) {
        console.warn('confirm-component already open!')
        return
      }

      this.icon = icon
      this.title = title
      this.content = content
      this.hasInput = hasInput
      this.inputPlaceholder = inputPlaceholder
      this.visible = true

      this.$nextTick(() => {
        const input = this.$refs.input as HTMLElement
        input.focus()
      })
    },
    cancel() {
      this.visible = false
      this.$emit('cancel')
    },
    confirm() {
      this.visible = false
      this.$emit('confirm', this.inputPlaceholder)
    }
  }
})
</script>

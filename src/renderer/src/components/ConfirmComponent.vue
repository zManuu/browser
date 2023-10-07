<template>
  <div
    v-if="visible"
    class="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center"
  >
    <div class="bg-slate-700 p-5 class rounded max-w-[50vw]">
      <div
        class="flex justify-start items-center space-x-1 border-b-2 border-slate-500 w-max px-1 pb-1"
      >
        <img :src="icon" class="w-6 h-6" />
        <h1 class="font-semibold text-2xl">{{ title }}</h1>
      </div>
      <p class="text-gray-400 mt-5">{{ content }}</p>
      <input
        v-if="hasInput"
        ref="input"
        v-model="inputValue"
        type="text"
        :placeholder="inputPlaceholder"
        class="bg-slate-800 px-3 py-1.5 w-full shadow rounded"
      />
      <div v-if="hasTemplates" class="mt-5">
        <p class="text-gray-400">Please select a template.</p>
        <ScrollComponent class="max-h-[50vh] bg-slate-800" axis="vertical">
          <div
            v-for="(template, index) in templates"
            :key="index"
            class="cursor-pointer p-3 rounded"
            :class="selectedTemplate === template[0] ? 'bg-slate-900' : 'bg-inherit'"
            @click="selectedTemplate = template[0]"
          >
            <h1 class="font-medium text-lg">{{ template[0] }}</h1>
            <p
              class="p-2 rounded whitespace-pre"
              :class="selectedTemplate === template[0] ? 'bg-slate-950' : 'bg-slate-900'"
            >
              {{ template[1] }}
            </p>
          </div>
        </ScrollComponent>
      </div>
      <div class="mt-5 flex justify-center items-center space-x-3">
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
import ScrollComponent from './ScrollComponent.vue'

export type ConfirmComponentType = {
  open(
    icon: string,
    title: string,
    content: string,
    hasInput?: boolean,
    inputPlaceholder?: string,
    hasTemplates?: boolean,
    templates?: Map<string, string>
  ): void
}

export default defineComponent({
  components: { ScrollComponent },
  emits: ['confirm', 'cancel'],
  data() {
    return {
      icon: '',
      visible: false,
      title: '',
      content: '',
      hasInput: false,
      inputPlaceholder: '',
      inputValue: undefined,
      hasTemplates: false,
      templates: undefined as Map<string, string> | undefined,
      selectedTemplate: undefined as string | undefined
    }
  },
  methods: {
    open(
      icon: string,
      title: string,
      content: string,
      hasInput = false,
      inputPlaceholder = '',
      hasTemplates = false,
      templates?: Map<string, string>
    ) {
      if (this.visible) {
        console.warn('confirm-component already open!')
        return
      }
      this.icon = icon
      this.title = title
      this.content = content
      this.hasInput = hasInput
      this.inputPlaceholder = inputPlaceholder
      this.hasTemplates = hasTemplates
      this.templates = templates
      this.visible = true
      this.$nextTick(() => {
        const input = this.$refs.input as HTMLElement
        input?.focus()
      })
    },
    cancel() {
      this.visible = false
      this.$emit('cancel')
    },
    confirm() {
      this.visible = false
      this.$emit('confirm', this.inputValue, this.selectedTemplate)
    }
  }
})
</script>

<template>
  <div
    v-show="visible"
    class="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center"
  >
    <div class="bg-slate-700 p-5 class rounded max-w-[50vw]">
      <header
        class="flex justify-start items-center space-x-1 border-b-2 border-slate-500 w-max px-1 pb-1"
      >
        <img :src="terminalIcon" class="w-5" />
        <h1 class="font-semibold text-2xl">Terminal-Settings</h1>
      </header>
      <main class="my-5">
        <div class="flex w-[30vw] justify-between items-center">
          <h1>Shorten Paths: {{ settings.shortenPaths }}</h1>
          <input v-model="settings.shortenPaths" type="range" min="0" max="10" step="1" />
        </div>
        <div class="flex w-[30vw] justify-between items-center">
          <h1>Show date</h1>
          <input v-model="settings.showDate" type="checkbox" />
        </div>
        <div class="flex w-[30vw] justify-between items-center">
          <h1>Show level</h1>
          <input v-model="settings.showLevel" type="checkbox" />
        </div>
        <div class="flex w-[30vw] justify-between items-center">
          <h1>Show module</h1>
          <input v-model="settings.showModule" type="checkbox" />
        </div>
        <h1 class="font-medium text-lg mt-3">Filter Log-Levels</h1>
        <div
          v-for="logLevel in logLevels"
          :key="logLevel"
          class="flex w-[30vw] justify-between items-center"
        >
          <h1>{{ logLevel }}</h1>
          <input v-model="settings.filter[logLevel]" type="checkbox" />
        </div>
      </main>
      <footer class="flex justify-center">
        <button
          class="flex items-center space-x-1 bg-slate-800 p-3 rounded hover:bg-slate-950 hover:border-2 border-slate-800 duration-300"
          @click="saveAndContinue"
        >
          <img :src="saveIcon" class="w-5" />
          <h1>Save & Continue</h1>
        </button>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import * as icons from '@renderer/icons'
import { LogLevel, logLevels } from '@shared/LogRecord'

export type TerminalSettingsComponentType = {
  getSettings(): TerminalSettings
}

export type TerminalSettings = {
  shortenPaths: number
  showDate: boolean
  showLevel: boolean
  showModule: boolean
  autoFocusInput: boolean
  filter: {
    [key in LogLevel]: boolean
  }
}

const defaultSettings: TerminalSettings = {
  shortenPaths: 0,
  showDate: true,
  showLevel: true,
  showModule: true,
  autoFocusInput: true,
  filter: {
    info: true,
    debug: true,
    warn: true,
    error: true
  }
}

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  data() {
    return {
      settings: defaultSettings,
      terminalIcon: icons.terminal,
      saveIcon: icons.save,
      logLevels
    }
  },
  methods: {
    getSettings() {
      return this.settings
    },
    saveAndContinue() {
      this.$emit('close')
    }
  }
})
</script>

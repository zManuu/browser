<template>
  <div class="w-full bg-slate-900 rounded-xl p-5">
    <header class="bg-slate-700 w-full p-2 font-semibold text-2xl rounded-t-xl">Terminal</header>
    <ScrollComponent axis="vertical" class="h-[25vh]">
      <p v-for="(logRecord, index) in logRecords" :key="index">{{ logRecord }}</p>
    </ScrollComponent>
    <input
      ref="in"
      type="text"
      class="w-full p-2 bg-slate-950 rounded-b-xl"
      :placeholder="inputPlaceholder"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ScrollComponent from './ScrollComponent.vue'
import { on } from '@renderer/ipc'
import Config from '@shared/Config'

export type TerminalComponentType = { addLogRecord: (logRecord: string) => void }

export default defineComponent({
  components: { ScrollComponent },
  data() {
    return {
      logRecords: [] as string[],
      inputPlaceholder: Config.TERMINAL_INPUT_PLACEHOLDER
    }
  },
  mounted() {
    const inputField = this.$refs.in as HTMLInputElement
    inputField.focus()

    on('log', (_ev, logRecord: string) => {
      this.addLogRecord(logRecord)
    })
  },
  methods: {
    addLogRecord(logRecord: string) {
      this.logRecords.push(logRecord)
    }
  }
})
</script>

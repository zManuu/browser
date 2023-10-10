<template>
  <div class="w-full opacity-75 hover:opacity-100 duration-300">
    <header class="bg-slate-700 flex justify-between items-center w-full p-2">
      <h1 class="font-semibold text-xl">Terminal</h1>
      <img :src="settingsIcon" class="w-5 cursor-pointer" @click="showSettingsMenu" />
    </header>
    <ScrollComponent ref="scroll" axis="vertical" class="h-[25vh]">
      <p v-for="(logRecord, index) in computedLogRecords" :key="index">
        {{ logRecord }}
      </p>
    </ScrollComponent>
    <input ref="in" type="text" class="w-full p-2 bg-slate-900" :placeholder="inputPlaceholder" />
  </div>
  <TerminalSettingsComponent
    ref="settings"
    :visible="settingsMenuVisible"
    @close="closeSettingsMenu"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ScrollComponent, { ScrollComponentType } from './ScrollComponent.vue'
import { on } from '@renderer/ipc'
import Config from '@shared/Config'
import * as icons from '@renderer/icons'
import TerminalSettingsComponent, {
  TerminalSettingsComponentType
} from './TerminalSettingsComponent.vue'
import LogRecord from '@shared/LogRecord'

export type TerminalComponentType = { addLogRecord: (logRecord: LogRecord) => void }

export default defineComponent({
  components: { ScrollComponent, TerminalSettingsComponent },
  data() {
    return {
      logRecords: [] as LogRecord[],
      inputPlaceholder: Config.TERMINAL_INPUT_PLACEHOLDER,
      settingsIcon: icons.settings,
      settingsMenuVisible: false,
      isMounted: false
    }
  },
  computed: {
    computedLogRecords(): string[] {
      if (!this.isMounted) return []

      const settings = this.getSettings()
      return this.logRecords
        .filter((e) => settings.filter[e.level] === true)
        .map((e) =>
          shortenPathsInMessage(
            Config.TERMINAL_LOG_FORMAT.replace('{timestamp}', settings.showDate ? e.timestamp : '')
              .replace('{level}', settings.showLevel ? e.level : '')
              .replace('{message}', e.message),
            settings.shortenPaths
          )
        )
    }
  },
  mounted() {
    if (this.getSettings().autoFocusInput) {
      const inputField = this.$refs.in as HTMLInputElement
      inputField.focus()
    }

    on('log', (_ev, logRecord) => {
      this.addLogRecord(logRecord)
    })

    this.isMounted = true
  },
  methods: {
    addLogRecord(logRecord: LogRecord) {
      this.logRecords.push(logRecord)

      // scroll to bottom of scroll component
      const scrollComponent = this.$refs.scroll as ScrollComponentType
      scrollComponent.scrollToBottom()
    },
    showSettingsMenu() {
      console.log('[Terminal] Showing settings menu ...')
      this.settingsMenuVisible = true
    },
    closeSettingsMenu() {
      console.log('[Terminal] Closing settings menu ...')
      this.settingsMenuVisible = false
    },
    getSettings() {
      const settingsComponent = this.$refs.settings as TerminalSettingsComponentType
      return settingsComponent.getSettings()
    }
  }
})

function shortenPathsInMessage(message: string, n: number) {
  let regexHit = Config.PATH_REGEX.exec(message)

  while (regexHit) {
    const path = regexHit[1]
    const pathComponents = path.split('\\').filter((e) => e !== '')

    if (n >= pathComponents.length) {
      return path // Der Pfad kann nicht weiter gekürzt werden, also den Originalpfad zurückgeben
    }

    const shortendPath = pathComponents.slice(-n).join('\\')
    message = message.replaceAll(regexHit[0], `"${shortendPath}"`)
    regexHit = Config.PATH_REGEX.exec(message)
  }

  return message
}
</script>

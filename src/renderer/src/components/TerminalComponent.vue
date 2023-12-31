<template>
  <div class="w-full opacity-75 hover:opacity-100 duration-300 h-[39vh]">
    <header class="bg-slate-700 flex justify-between items-center w-full p-2">
      <h1 class="font-semibold text-xl">Terminal</h1>
      <img :src="settingsIcon" class="w-5 cursor-pointer" @click="showSettingsMenu" />
    </header>
    <ScrollComponent ref="scroll" axis="vertical" class="h-[25vh]">
      <div v-for="(logRecord, index) in computedLogRecords" :key="index">
        <h1>{{ logRecord }}</h1>
        <div v-if="recordSpacerEnabled" class="my-5 h-0.5 w-auto mx-10 bg-slate-700"></div>
      </div>
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
import ScrollComponent from './ScrollComponent.vue'
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
    },
    recordSpacerEnabled() {
      if (!this.isMounted) return false
      return this.getSettings().recordSpacer
    }
  },
  mounted() {
    if (this.getSettings().autoFocusInput) {
      const inputField = this.$refs.in as HTMLInputElement
      inputField.focus()
    }

    on('log', (logRecord) => {
      this.addLogRecord(logRecord)
    })

    this.isMounted = true
  },
  methods: {
    addLogRecord(logRecord: LogRecord) {
      this.logRecords.push(logRecord)

      // scroll to bottom of scroll component
      // todo: fixx
      // const scrollComponent = this.$refs.scroll as ScrollComponentType
      // scrollComponent.scrollToBottom()
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

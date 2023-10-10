<template>
  <TerminalComponent ref="tc" />
</template>
<script lang="ts">
import TerminalComponent, {
  TerminalComponentType
} from '@renderer/components/TerminalComponent.vue'
import { logLevels } from '@shared/LogRecord'
import { defineComponent } from 'vue'
import ConfigPlatform from '@shared/Config-Platform'

export default defineComponent({
  components: {
    TerminalComponent
  },
  mounted() {
    const tc = this.$refs.tc as TerminalComponentType

    // basic logs
    for (const logLevel of logLevels) {
      tc.addLogRecord({
        timestamp: '09.10.2023 | 10:47:55',
        level: logLevel,
        message: 'Hello World!'
      })
    }

    // path log
    tc.addLogRecord({
      timestamp: '09.10.2023 | 10:47:55',
      level: 'info',
      message: `Testing path: >"${ConfigPlatform.PROJECT_PATH}"<`
    })
  }
})
</script>

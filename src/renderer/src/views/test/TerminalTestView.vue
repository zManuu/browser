<template>
  <TerminalComponent ref="tc" />
</template>
<script lang="ts">
import TerminalComponent, {
  TerminalComponentType
} from '@renderer/components/TerminalComponent.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    TerminalComponent
  },
  mounted() {
    const tc = this.$refs.tc as TerminalComponentType

    for (let i = 0; i < 100; i++) {
      tc.addLogRecord('07.10.2023 | 18:11:35 [info] enabling the browser window')
    }
  }
})
</script>

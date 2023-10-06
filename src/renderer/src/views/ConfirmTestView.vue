<template>
  <button @click="openDeleteTest">Open a delete-confirm test</button>
  <br />
  <button @click="openClearTest">Open a clear-confirm test</button>
  <ConfirmComponent ref="cc" />
</template>
<script lang="ts">
import ConfirmComponent from '@renderer/components/ConfirmComponent.vue'
import { defineComponent } from 'vue'
import * as icons from '@renderer/icons'

export default defineComponent({
  components: { ConfirmComponent },
  methods: {
    openDeleteTest() {
      const cc = this.$refs.cc as {
        open(icon: string, title: string, content: string): void
      }
      cc.open(icons.deletee, 'Delete', 'Are you sure you want to delete this file?')
    },
    openClearTest() {
      const cc = this.$refs.cc as {
        open(icon: string, title: string, content: string): void
      }
      cc.open(icons.clear, 'Clear', 'Are you sure you want to clear this file?')
    }
  }
})
</script>

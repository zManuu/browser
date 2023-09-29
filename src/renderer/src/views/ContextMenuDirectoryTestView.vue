<template>
  <h1>Test</h1>
  <ContextMenuComponent :fs-entry="testDirectory" />
</template>
<script lang="ts">
import ContextMenuComponent from '@renderer/components/ContextMenuComponent.vue'
import { testDirectory } from '@shared/testData'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { ContextMenuComponent },
  data() {
    return {
      testDirectory: testDirectory
    }
  }
})
</script>

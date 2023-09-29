<template>
  <h1>Test</h1>
  <ContextMenuComponent :fs-entry="testFile" />
</template>
<script lang="ts">
import ContextMenuComponent from '@renderer/components/ContextMenuComponent.vue'
import { testDirectory, testFile } from '@shared/testData'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { ContextMenuComponent },
  data() {
    return {
      testFile: testFile,
      testDirectory: testDirectory
    }
  }
})
</script>

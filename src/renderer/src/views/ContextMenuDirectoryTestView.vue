<template>
  <ContextMenuComponent :fs-entry="testDirectory" />
</template>
<script lang="ts">
import ContextMenuComponent from '@renderer/components/ContextMenuComponent.vue'
import { getTestDirectory } from '@shared/testData'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { ContextMenuComponent },
  data() {
    return {
      testDirectory: getTestDirectory()
    }
  }
})
</script>

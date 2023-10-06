<template>
  <ScrollComponent axis="vertical" class="h-[49vh]">
    <ContextMenuComponent :fs-entry="testDirectory" />
  </ScrollComponent>
</template>
<script lang="ts">
import ContextMenuComponent from '@renderer/components/ContextMenuComponent.vue'
import ScrollComponent from '@renderer/components/ScrollComponent.vue'
import { getTestDirectory } from '@shared/testData'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { ContextMenuComponent, ScrollComponent },
  data() {
    return {
      testDirectory: getTestDirectory()
    }
  }
})
</script>

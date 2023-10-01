<template>
  <PreviewComponent :fs-entry="testDirectory" />
</template>
<script lang="ts">
import PreviewComponent from '@renderer/components/PreviewComponent.vue'
import { getTestDirectory } from '@shared/testData'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { PreviewComponent },
  data() {
    return {
      testDirectory: getTestDirectory()
    }
  }
})
</script>

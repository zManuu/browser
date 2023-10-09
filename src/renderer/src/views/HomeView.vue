<template>
  <div class="flex flex-col">
    <h1>Welcome!</h1>
    <router-link :to="`/browse/${testDirectory}\\`">Click to browse</router-link>
    <router-link to="/test/contextmenu/file">Click to test contextmenu with a file</router-link>
    <router-link to="/test/contextmenu/directory"
      >Click to test contextmenu with a directory</router-link
    >
    <router-link to="/test/preview/file">Click to test preview with a file</router-link>
    <router-link to="/test/preview/directory">Click to test preview with a directory</router-link>
    <router-link to="/test/confirm">Click to test the confirm component</router-link>
    <router-link to="/test/terminal">Click to test the terminal</router-link>
  </div>
</template>
<script lang="ts">
import { getTestDirectory } from '@shared/testData'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      testDirectory: `${getTestDirectory().parentPath}\\${getTestDirectory().name}`
    }
  }
})
</script>

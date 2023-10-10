<template>
  <router-view :key="$route.fullPath" />
</template>
<script lang="ts">
import { is } from '@electron-toolkit/utils'
import { defineComponent } from 'vue'

export default defineComponent({
  mounted() {
    if (!is.dev) this.$router.push('/')
  }
})
</script>

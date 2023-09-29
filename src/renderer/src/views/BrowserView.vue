<template>
  <BrowseUpComponent @go-up="goUp" />
  <FsEntryComponent v-for="(file, index) in shownFsEntries" :key="index" :fs-entry="file" />
</template>
<script lang="ts">
import { FsEntry } from '@shared/FsEntry'
import { Directory, getParentDirectory } from '@shared/Directory'
import { defineComponent } from 'vue'
import { request } from '../ipc'
import FsEntryComponent from '@renderer/components/FsEntryComponent.vue'
import BrowseUpComponent from '@renderer/components/BrowseUpComponent.vue'

export default defineComponent({
  components: { FsEntryComponent, BrowseUpComponent },
  data() {
    return {
      currentDirectory: undefined as Directory | undefined,
      shownFsEntries: [] as FsEntry[]
    }
  },
  async mounted() {
    const directoryName = this.getDirectoryName()

    console.log(`Requesting directory ${directoryName}...`)

    const req = request('requestDirectory', directoryName)
    const res = await req
    this.currentDirectory = res.directory
    this.shownFsEntries = res.fsEntries

    console.log(`Successfully requested directory ${directoryName}.`)
  },
  methods: {
    getDirectoryName() {
      const directoryParam = this.$route.params['dir']
      const directoryName = typeof directoryParam !== 'string' ? 'C' : directoryParam
      return directoryName
    },
    goUp() {
      const directoryName = this.getDirectoryName()
      const parentDirectory = getParentDirectory(directoryName)

      if (parentDirectory) this.$router.push(`/browse/${parentDirectory}`)
    }
  }
})
</script>

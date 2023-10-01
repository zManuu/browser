<template>
  <BrowseUpComponent @go-up="goUp" />
  <div class="flex">
    <div class="w-5/6 flex flex-col">
      <FsEntryComponent
        v-for="(fsEntry, index) in shownFsEntries"
        :key="index"
        :fs-entry="fsEntry"
        @handle-click="handleClick(fsEntry)"
      />
    </div>
    <div class="w-1/6 flex flex-col">
      <ContextMenuComponent v-if="selectedFsEntry" :fs-entry="selectedFsEntry" />
      <PreviewComponent v-if="selectedFsEntry" :fs-entry="selectedFsEntry" />
    </div>
  </div>
</template>
<script lang="ts">
import { FsEntry } from '@shared/FsEntry'
import { Directory, getParentDirectory } from '@shared/Directory'
import { defineComponent } from 'vue'
import { request, send } from '../ipc'
import FsEntryComponent from '@renderer/components/FsEntryComponent.vue'
import BrowseUpComponent from '@renderer/components/BrowseUpComponent.vue'
import ContextMenuComponent from '@renderer/components/ContextMenuComponent.vue'
import PreviewComponent from '@renderer/components/PreviewComponent.vue'

export default defineComponent({
  components: { FsEntryComponent, BrowseUpComponent, ContextMenuComponent, PreviewComponent },
  data() {
    return {
      currentDirectory: undefined as Directory | undefined,
      shownFsEntries: [] as FsEntry[],
      selectedFsEntry: undefined as FsEntry | undefined
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
    },
    handleClick(fsEntry: FsEntry) {
      if (this.selectedFsEntry != fsEntry) {
        this.selectedFsEntry = fsEntry
        return
      }

      const fsEntryPath = `${fsEntry.parentPath}\\${fsEntry.name}`

      if (fsEntry.type == 'directory') {
        this.$router.push(fsEntryPath)
      } else if (fsEntry.type == 'file') {
        send('openFile', fsEntryPath)
      }

      this.selectedFsEntry = undefined
    }
  }
})
</script>

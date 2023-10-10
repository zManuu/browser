<template>
  <div class="flex">
    <div :class="selectedFsEntry ? 'w-2/3' : 'w-full'">
      <ScrollComponent class="h-[70vh] w-full" axis="vertical">
        <BrowseUpComponent @go-up="goUp" />
        <FsEntryComponent
          v-for="(fsEntry, index) in shownFsEntries"
          :key="index"
          :fs-entry="fsEntry"
          @handle-click="handleClick(fsEntry)"
        />
      </ScrollComponent>
      <TerminalComponent />
    </div>
    <div v-if="selectedFsEntry" class="w-1/3 space-y-[2vh]">
      <ScrollComponent axis="vertical" class="h-[49vh]">
        <ContextMenuComponent :fs-entry="selectedFsEntry" />
      </ScrollComponent>
      <div class="h-[2vh] bg-slate-600"></div>
      <ScrollComponent axis="both" class="h-[49vh]">
        <PreviewComponent :fs-entry="selectedFsEntry" />
      </ScrollComponent>
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
import ScrollComponent from '@renderer/components/ScrollComponent.vue'
import TerminalComponent from '@renderer/components/TerminalComponent.vue'

export default defineComponent({
  components: {
    FsEntryComponent,
    BrowseUpComponent,
    ContextMenuComponent,
    PreviewComponent,
    ScrollComponent,
    TerminalComponent
  },
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
        send('contextMenuAction', {
          fsEntryPath,
          type: 'open.open',
          params: undefined
        })
      }

      this.selectedFsEntry = undefined
    }
  }
})
</script>

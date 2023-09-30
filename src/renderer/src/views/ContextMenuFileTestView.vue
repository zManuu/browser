<template>
  <label>File-Type:</label>
  <select v-model="selectedFileType" class="bg-slate-700" @change="handleFileTypeSelection">
    <option v-for="(fileType, fileTypeIndex) in fileTypes" :key="fileTypeIndex" :value="fileType">
      {{ fileType }}
    </option>
  </select>
  <ContextMenuComponent :fs-entry="testFile" />
</template>
<script lang="ts">
import ContextMenuComponent from '@renderer/components/ContextMenuComponent.vue'
import { getTestFile } from '@shared/testData'
import { fileTypes } from '@shared/File'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { ContextMenuComponent },
  data() {
    return {
      fileTypes,
      testFile: getTestFile(fileTypes[0]),
      selectedFileType: fileTypes[0]
    }
  },
  methods: {
    handleFileTypeSelection() {
      this.testFile = getTestFile(this.selectedFileType)
    }
  }
})
</script>

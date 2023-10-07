<template>
  <label>File-Type:</label>
  <select v-model="selectedFileType" class="bg-slate-700" @change="handleFileTypeSelection">
    <option v-for="(fileType, fileTypeIndex) in fileTypes" :key="fileTypeIndex" :value="fileType">
      {{ fileType }}
    </option>
  </select>
  <PreviewComponent :fs-entry="testFile" />
</template>
<script lang="ts">
import { getTestFile } from '@shared/testData'
import { fileType, fileTypes } from '@shared/File'
import { defineComponent } from 'vue'
import PreviewComponent from '@renderer/components/PreviewComponent.vue'

export default defineComponent({
  components: { PreviewComponent },
  data() {
    return {
      fileTypes,
      testFile: getTestFile('txt' as fileType),
      selectedFileType: 'txt' as fileType
    }
  },
  methods: {
    handleFileTypeSelection() {
      this.testFile = getTestFile(this.selectedFileType)
    }
  }
})
</script>

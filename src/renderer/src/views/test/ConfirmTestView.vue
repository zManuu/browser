<template>
  <button @click="openDeleteTest">Open a delete-confirm</button>
  <br />
  <button @click="openClearTest">Open a clear-confirm</button>
  <br />
  <button @click="openRenameTest">Open a rename-confirm</button>
  <br />
  <button @click="openCreateTxtFileTest">Open a createfile-confirm (without templates)</button>
  <br />
  <button @click="openCreateVueFileTest">Open a createfile-confirm (with templates)</button>
  <ConfirmComponent ref="cc" />
</template>
<script lang="ts">
import ConfirmComponent, { ConfirmComponentType } from '@renderer/components/ConfirmComponent.vue'
import { defineComponent } from 'vue'
import * as icons from '@renderer/icons'
import { templates } from '@shared/File'

export default defineComponent({
  components: { ConfirmComponent },
  methods: {
    cc() {
      return this.$refs.cc as ConfirmComponentType
    },
    openDeleteTest() {
      this.cc().open(icons.deletee, 'Delete', 'Are you sure you want to delete this file?')
    },
    openClearTest() {
      this.cc().open(icons.clear, 'Clear', 'Are you sure you want to clear this file?')
    },
    openRenameTest() {
      this.cc().open(
        icons.rename,
        'Rename',
        'Please enter a new name for this file.',
        true,
        'New name'
      )
    },
    openCreateTxtFileTest() {
      this.cc().open(
        icons.file_txt,
        'Create TXT File',
        'What should be the name of the new file?',
        true,
        'File name'
      )
    },
    openCreateVueFileTest() {
      this.cc().open(
        icons.file_vue,
        'Create Vue File',
        'What should be the name of the new file?',
        true,
        'File name',
        true,
        templates.get('vue')
      )
    }
  }
})
</script>

<template>
  <button @click="openDeleteTest">Open a delete-confirm</button>
  <br />
  <button @click="openClearTest">Open a clear-confirm</button>
  <br />
  <button @click="openCreateFileTest">Open a createfile-confirm</button>
  <ConfirmComponent ref="cc" />
</template>
<script lang="ts">
import ConfirmComponent from '@renderer/components/ConfirmComponent.vue'
import { defineComponent } from 'vue'
import * as icons from '@renderer/icons'

export default defineComponent({
  components: { ConfirmComponent },
  methods: {
    cc() {
      return this.$refs.cc as {
        open(
          icon: string,
          title: string,
          content: string,
          hasInput?: boolean,
          inputPlaceholder?: string
        ): void
      }
    },
    openDeleteTest() {
      this.cc().open(icons.deletee, 'Delete', 'Are you sure you want to delete this file?')
    },
    openClearTest() {
      this.cc().open(icons.clear, 'Clear', 'Are you sure you want to clear this file?')
    },
    openCreateFileTest() {
      this.cc().open(
        icons.file_txt,
        'Create TXT File',
        'What should be the name of the new file?',
        true,
        'File name'
      )
    }
  }
})
</script>

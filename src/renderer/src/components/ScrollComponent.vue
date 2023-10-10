<template>
  <div ref="scrollDiv" class="flex" :class="style">
    <slot> Empty scroll-component </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export type ScrollComponentType = {
  scrollToTop(): void
  scrollToBottom(): void
}

export default defineComponent({
  props: {
    axis: {
      type: Object as PropType<'vertical' | 'horizontal' | 'both'>,
      required: false,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: 'vertical'
    }
  },
  computed: {
    style() {
      switch (this.axis) {
        case 'vertical':
          return 'overflow-y-scroll overflow-x-hidden flex-col'
        case 'horizontal':
          return 'overflow-x-scroll overflow-y-hidden flex-row'
        case 'both':
          return 'overflow-x-scroll overflow-y-scroll'
        default:
          return ''
      }
    }
  },
  methods: {
    scrollToTop() {
      const scrollDiv = this.$refs.scrollDiv as HTMLDivElement
      scrollDiv.scrollTop = 0
    },
    scrollToBottom() {
      const scrollDiv = this.$refs.scrollDiv as HTMLDivElement
      scrollDiv.scrollTop = Number.MAX_SAFE_INTEGER
    }
  }
})
</script>

<template>
  <div class="flex" :class="style">
    <slot> Empty scroll-component </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

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
          return 'overflow-y-scroll flex-col'
        case 'horizontal':
          return 'overflow-x-scroll flex-row'
        case 'both':
          return 'overflow-x-scroll overflow-y-scroll'
        default:
          return ''
      }
    }
  }
})
</script>

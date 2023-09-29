<template>
  <div
    class="flex"
    :class="axis == 'vertical' ? 'overflow-y-scroll flex-col' : 'overflow-x-scroll flex-row'"
  >
    <slot> Empty scroll-component </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    axis: {
      type: Object as PropType<'vertical' | 'horizontal'>,
      required: false,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: 'vertical'
    }
  }
})
</script>

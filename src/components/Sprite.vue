<!--
Convenience component for rendering static sprites from spritesheet
-->
<template>
  <div
    class="g-sprite"
    :style="spriteStyle"
  >
    <slot />
  </div>
</template>

<script>
import { PIXEL_SIZE } from '@/utils/constants';

export default {
  name: 'Number',
  
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },

  computed: {
    spriteStyle() {
      return {
        width: `${this.width * PIXEL_SIZE}px`,
        height: `${this.height * PIXEL_SIZE}px`,
        backgroundPosition: `${this.x * -PIXEL_SIZE}px ${this.y * -PIXEL_SIZE}px`,
      };
    },
  }
}
</script>

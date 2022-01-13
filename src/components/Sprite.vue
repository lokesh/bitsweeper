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
import { mapState } from 'vuex';


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
    ...mapState([
      'pixelSize',
    ]),
  
    spriteStyle() {
      return {
        width: `${this.width * this.pixelSize}px`,
        height: `${this.height * this.pixelSize}px`,
        backgroundPosition: `${this.x * -this.pixelSize}px ${this.y * -this.pixelSize}px`,
      };
    },
  }
}
</script>

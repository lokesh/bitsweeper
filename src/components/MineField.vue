<template>
  <div>
    <div
      class="field"
      :class="{
        'is-shaking': isShaking,
        'is-paused': isPaused,
      }"
      :style="fieldStyles"
    >
      <block
        v-for="(block, i) in blocks"
        :key="i"
        :block="block"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Block from '@/components/Block'; 
import { STATE_LOST, STATE_WON } from '@/utils/constants';

export default {
  name: 'Minefield',
  
  components: {
    Block,
  },

  props: {
    msg: String
  },

  data() {
    return {
      isShaking: false,
    };
  },

  computed: {
    ...mapState([
      'field',
      'gameState',
    ]),

    rows() {
      return this.field.length;
    },

    cols() {
      return this.field[0].length;
    },

    blocks() {
      let blocks = [];
      this.field.forEach(row => {
        row.forEach(block => {
          blocks.push(block);
        })
      })
      return blocks;
    },

    fieldStyles() {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${this.cols}, var(--block-size))`,
      };
    },

    isPaused() {
      return [STATE_LOST, STATE_WON].includes(this.gameState);
    },
  },

  watch: {
    gameState(val) {
      if (val === STATE_LOST) {
        this.isShaking = true;
        setTimeout(() => {
          this.isShaking = false;
        }, 300);
      }
    },
  },

  mounted() {
    // Disables default right-click behavior which pulls up the context menu.
    this.$el.addEventListener('contextmenu', function(e){
        e.preventDefault();
    }, false);
  },

}
</script>

<style scoped>
.field.is-paused {
  pointer-events:  none;
}

.field.is-shaking {
  animation-name: shake;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes shake {
  0% {
    transform: translate(0, 0)
  }
  15% {
    transform: translate(24px, 0)
  }
  30% {
    transform: translate(-12px, 0)
  }
  45% {
    transform: translate(12px, 0)
  }
  60% {
    transform: translate(-6px, 0)
  }
  75% {
    transform: translate(12px, 0)
  }
  90% {
    transform: translate(-6px, 0)
  }
  100% {
    transform: translate(0, 0)
  }
}
</style>

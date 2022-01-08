<template>
  <div>
    <div
      class="field"
      :class="{ 'is-shaking': isShaking }"
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
import { STATE_LOST } from '@/utils/constants';

export default {
  name: 'MineField',
  
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
    }
  },

  watch: {
    gameState(val) {
      if (val === STATE_LOST) {
        console.log('shake');
        this.isShaking = true;
        setTimeout(() => {
          this.isShaking = false;
        }, 300);
      }
    },
  },

}
</script>

<style scoped>
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

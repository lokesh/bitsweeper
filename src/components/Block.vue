<template>
  <div>
    <div
      class="block"
      aria-role="button"
      tabindex="0"
      @click="onClick"
      @keyup.enter="onClick"
      @keyup.space.prevent="onClick"
    >
      {{ block.row }}
      {{ block.col }}
      <!-- {{ block.neighborMinesCount }}
      {{ block.hasMine ? 'X' : '0' }} -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { STATE_READY } from '@/utils/constants';
import { getNeighbors } from '@/utils/index';

export default {
  name: 'Block',

  props: {
    /**
     * Instane of class from Block.js
     * @type {Object}
     */
    block: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState([
      'cols',
      'gameState',
      'rows',
    ]),
  },

  updated() {
    console.log('Block:updated');
  },

  methods: {
    onClick() {
      // console.log(this.block.row);
      getNeighbors(this.block.row, this.block.col, this.rows, this.cols);

      if (this.gameState === STATE_READY) {
        this.$store.dispatch('startGame');
      }

    },
  }
}
</script>

<style scoped>
.block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--block-size);
  height: var(--block-size);
  background: var(--color-bg);
  border: 1px solid var(--color);
  font-weight: bold;
  user-select: none;
  cursor: pointer;
}

.block:hover {
  background: #666;
}

.block:focus {
  background: #999;
}
</style>

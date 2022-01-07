<template>
  <div>
    <div
      class="block"
      :class="{ 'is-open': block.isOpen }"
      aria-role="button"
      tabindex="0"
      @mouseup="onClick"
      @keyup.enter="onClick"
      @keyup.space.prevent="onClick"
    >
      <!-- {{ block.row }}
      {{ block.col }} -->
      <div v-if="block.isOpen">
        {{ label }}
      </div>
      <div v-else-if="block.flagged">
        ⛳️
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { STATE_READY } from '@/utils/constants';

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
      'field',
      'gameState',
      'rows',
    ]),

    label() {
      if (this.block.hasMine) {
        return  '💣';
      } else if (this.block.neighborMinesCount > 0) {
        return this.block.neighborMinesCount;
      }
      return '';
    },
  },

  methods: {
    onClick(e) {
      // FLAG
      const isFlagging = (e.shiftKey === true || e.which > 1);

      if (isFlagging && !this.isOpen) {
        this.$store.dispatch('toggleFlag', this.block);
      }  else {
        // OPEN
        // First click should never hit a mine, so we set initial block to open
        // and then populate mines. We still need to run openBlock as the first
        // click might have been a zero and we need to expand out.
        if (this.gameState === STATE_READY) {
          this.$store.commit('setBlockToOpen', this.block);
          this.$store.dispatch('startGame');
        } 
        this.$store.dispatch('openBlock', this.block);    
      }
    },    
  },
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
  font-size: 24px;
}

.block.is-open {
  background: #fff;
  pointer-events: none;
}

/*.block:hover {
  background: #666;
}

.block:focus {
  background: #999;
}*/
</style>

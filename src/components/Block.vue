<template>
  <div>
    <div
      v-longpress="onLongpress"
      class="block"
      :class="{ 'is-open': block.isOpen }"
      aria-role="button"
      tabindex="0"
      :style="blockStyle"
      @mouseup="onClick"
    >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  STATE_READY,
  STATE_WON,
  STATE_LOST,
  SFX_FLAG,
  SFX_OPEN,
} from '@/utils/constants';
import { play } from '@/utils/sound';
import { getSpritePosition } from '@/utils/sprite';

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

  data() {
    return {
      allowClick: true,
      pointerDown: false,
    };
  },

  computed: {
    ...mapState([
      'cols',
      'field',
      'gameState',
      'rows',
    ]),

    blockStyle() {
      let sprite = 'block';
      
      if (this.block.isOpen) {
        if (this.block.hasMine) {
          sprite = 'mine';
        } else {
          sprite = this.block.neighborMinesCount;
        }
      } else {
        if (this.block.flagged) {
          sprite = 'flag';
        }
      }

      // Won and Lost states
      if (this.gameState === STATE_WON) {
        // Put flags on all mines
        if (this.block.hasMine && !this.block.isOpen) {
            sprite = 'flag';
        }
      } else if (this.gameState === STATE_LOST) {
        // Show all mines
        if (this.block.hasMine) {
          sprite = 'mine';
        }
      }

      return {
        backgroundPosition: getSpritePosition(sprite),
      }
    },

    label() {
      if (this.block.hasMine) {
        return  '💣';
      } else if (this.block.neighborMinesCount > 0) {
        return this.block.neighborMinesCount;
      }
      return '';
    },
  },

  mounted() {
    ['mousedown', 'touchstart'].forEach(e => this.$el.addEventListener(e, this.onPointerdown));
  },

  unmounted() {
    ['mousedown', 'touchstart'].forEach(e => this.$el.removeEventListener(e, this.onPointerdown));
  },

  methods: {
    flag() {
      play(SFX_FLAG);
      this.$store.dispatch('toggleFlag', this.block);
    },
    
    onClick(e) {
      this.pointerDown = false;

      if (!this.allowClick) return;
      // FLAG
      const isFlagging = (e.shiftKey === true || e.which > 1);

      if (isFlagging && !this.isOpen) {
        this.flag();
      }  else {
        play(SFX_OPEN);
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
    
    /* 
    If a longpress occurs (set a flag), we don't want the click/mouseup default behavior (opening 
    the block) to also occur on tap or mouse release up. We resolve by setting allowClick to false
    and then enabling clickign again on the next mousedown/touchstart event.

    On mobile, both the mousedown and touchstart events were firing so we set a pointerDown boolean
    was added to prevent the code from running twice.
    */
    onPointerdown() {
      if (this.pointerDown) return;

      this.pointerDown = true;
      this.allowClick = true;
    },

    onLongpress() {
      this.allowClick = false;
      this.flag();
    },
  },
}
</script>

<style scoped>
.block {
  width: var(--block-size);
  height: var(--block-size);
  background: var(--color-bg);
  cursor: pointer;
  background: url('../assets/sprites-1bit.png');
  background-size: 480px 480px;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

.block.is-open {
  pointer-events: none;
}

.block:focus {
  outline: none;
}
</style>

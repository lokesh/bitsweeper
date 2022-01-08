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
  SFX_FLAG,
  SFX_OPEN,
} from '@/utils/constants';
import { play } from '@/utils/sound';


// Values are ROW,COL
const spriteSpec = {
  0: '0,0',
  1: '1,0',
  2: '2,0',
  3: '3,0',
  4: '4,0',
  5: '5,0',
  6: '6,0',
  7: '7,0',
  8: '8,0',
  'block': ['0,1','1,1','2,1','3,1','4,1','5,1','6,1','7,1','8,1'],
  'flag': '0,2',
  'mine': '1,2',
};


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
      // 1. Determine what to show
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

      // 2. Look up sprite in sheet
      const spriteSize = 48;
      let spec = spriteSpec[sprite];      
      let rowCol;
      
      if (typeof spec === 'string') {
        rowCol = spec.split(',');  
      } else {
        let randIndex = Math.floor(Math.random() * spec.length);
        rowCol = spec[randIndex].split(',');
      }
      
      let x = rowCol[1] * spriteSize * -1;
      let y = rowCol[0] * spriteSize * -1;

      return {
        backgroundPosition: `${x}px ${y}px`,
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

  // TODO: remove bindings
  mounted() {
    ['mousedown', 'touchstart'].forEach(e => this.$el.addEventListener(e, this.onPointerdown));
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--block-size);
  height: var(--block-size);
  background: var(--color-bg);
  font-weight: bold;
  user-select: none;
  cursor: pointer;
  font-size: 24px;
  background: url('../assets/sprites-1bit.png');
  background-size: 480px 480px;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

.block.is-open {
/*  background: #fff;*/
  pointer-events: none;
}

/*.block:hover {
  background: #666;
}
*/
.block:focus {
  outline: none;
}
</style>

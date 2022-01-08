<template>
  <div>
    <div
      class="block"
      :class="{ 'is-open': block.isOpen }"
      aria-role="button"
      tabindex="0"
      :style="blockStyle"
      @mouseup="onClick"
      @keyup.enter="onClick"
      @keyup.space.prevent="onClick"
    >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { STATE_READY } from '@/utils/constants';


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

  computed: {
    ...mapState([
      'cols',
      'field',
      'gameState',
      'rows',
    ]),

    blockStyle() {
      // Determine what to show and then look up sprite position
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
      // console.log(spriteSpec[sprite]);
      const spriteSize = 48;
      const spec = spriteSpec[sprite];
      
      let rowCol;
      console.log(spec);
      if (typeof spec === 'string') {
        rowCol = spec.split(',');  
      } else {
        let randIndex = Math.floor(Math.random() * spec.length);
        rowCol = spec[randIndex].split(',');
      }
      
      let x = rowCol[1] * spriteSize * -1;
      let y = rowCol[0] * spriteSize * -1;
      console.log(x, y);
      return {
        backgroundPosition: `${x}px ${y}px`,
      }
      // return sprite;
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
/*  border: 1px solid var(--color);*/
  font-weight: bold;
  user-select: none;
  cursor: pointer;
  font-size: 24px;
  background: url('../assets/sprites-muted.png');
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

.block:focus {
  background: #999;
}*/
</style>

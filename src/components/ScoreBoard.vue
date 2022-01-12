<template>
  <div class="score-board">
    <div
      class="g-sprite menu-button"
      aria-role="button"
      tabindex="0"
      :style="menuButtonStyle"
      @click="openMenu"
      @keyup.enter.space="openMenu"
    />    
    <div class="mine-count">
      <div class="g-sprite mine-icon" />    
      <number :value="remainingMinesCount" />
    </div>
    <!-- <div>
      💣 {{ mines - flags }}
    </div>-->
    <div
      class="g-sprite player"
      aria-role="button"
      tabindex="0"
      :style="playerStyle"
      @click="resetGame"
      @keyup.enter.space="resetGame"
    />    
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Number from '@/components/Number';
import { STATE_LOST, STATE_WON, SFX_RESTART } from '@/utils/constants';
import { play } from '@/utils/sound';
import { getSpritePosition } from '@/utils/sprite';

export default {
  name: 'ScoreBoard',
  
  components: {
    Number,
  },

  computed: {
    ...mapState([
      'blocksRemaining',
      'flags',
      'mines',
      'gameState',
    ]),

    menuButtonStyle() {      
      return {
        backgroundPosition: getSpritePosition('menu'),
      };
    },

    playerStyle() {      
      let sprite = 'p-rest';
      if (this.gameState === STATE_LOST) {
        sprite = 'p-loss';
      }

      if (this.gameState === STATE_WON) {
        sprite = 'p-won';
      }

      return {
        backgroundPosition: getSpritePosition(sprite),
      }
    },

    remainingMinesCount() {
      let str = String(Math.max(0, this.mines - this.flags));
      if (str.length < 2) {
        str = `0${str}`; 
      }
      return str;
    }
  },

  methods: {
    openMenu() {
      console.log('TODO: Open menu');
    },
    resetGame() {
      play(SFX_RESTART);
      this.$store.dispatch('resetGame');
    },
  }
}
</script>

<style scoped>
.score-board {
  display: flex;
  justify-content: space-between;
  gap: 36px;
}

.menu-button {
  width: var(--block-size);
  height: var(--block-size);
  cursor: pointer;
  outline: none;
}

.mine-count {
  display: flex;
  gap: 4px;
  align-items: center;
}

.mine-icon {
  width: calc(4px * var(--pixel-size));
  height:  calc(6px * var(--pixel-size));
  background-position: -352px 0;
}

.player {
  width: var(--block-size);
  height: var(--block-size);
  cursor: pointer;
  outline: none;
}
</style>

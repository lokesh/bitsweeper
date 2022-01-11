<template>
  <div class="score-board">
    <div>
      █ {{ blocksRemaining }}
    </div>
    <!-- <div>
      💣 {{ mines - flags }}
    </div>-->
    <div
      class="player"
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
import { STATE_LOST, STATE_WON, SFX_RESTART } from '@/utils/constants';
import { play } from '@/utils/sound';
import { getSpritePosition } from '@/utils/sprite';

export default {
  name: 'ScoreBoard',
  
  computed: {
    ...mapState([
      'blocksRemaining',
      'flags',
      'mines',
      'gameState',
    ]),

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
  },

  methods: {
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

.player {
  width: var(--block-size);
  height: var(--block-size);
  background: var(--color-bg);
  cursor: pointer;
  background: url('../assets/sprites-1bit.png');
  background-size: 480px 480px;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  outline: none;
}
</style>

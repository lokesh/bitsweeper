<template>
  <div class="score-board">
    <div class="left-section">
      <div
        class="g-sprite menu-button"
        aria-role="button"
        tabindex="0"
        :style="menuButtonStyle"
        @click="openMenu"
        @keyup.enter.space="openMenu"
      />  
      <string value="Hi Sarah" />  
    </div>

    <div class="mine-count">
      <div class="g-sprite mine-icon" />    
      <number :value="remainingMinesCount" />
    </div>

    <div class="right-section">
      <sprite
        v-if="isGameover"
        class="arrow"
        :x="24"
        :y="36"
        :width="12"
        :height="12"
      />    
      <div
        class="g-sprite player"
        :class="playerClass"
        aria-role="button"
        tabindex="0"
        @click="resetGame"
        @keyup.enter.space="resetGame"
      />    
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Number from '@/components/Number';
import String from '@/components/String';
import Sprite from '@/components/Sprite';
import {
  MODAL_SETTINGS,
  STATE_LOST,
  STATE_WON,
  SFX_MENU_OPEN,
  SFX_RESTART
} from '@/utils/constants';
import { play } from '@/utils/sound';
import { getSpritePosition } from '@/utils/sprite';

export default {
  name: 'ScoreBoard',
  
  components: {
    Number,
    Sprite,
    String,
  },

  computed: {
    ...mapGetters([
      'remainingMinesCount',
    ]),

    ...mapState([
      'blocksRemaining',
      'flags',
      'mines',
      'gameState',
    ]),

    isGameover() {
      return [STATE_LOST, STATE_WON].includes(this.gameState);
    },

    menuButtonStyle() {      
      return {
        backgroundPosition: getSpritePosition('menu'),
      };
    },

    playerClass() {
      if (this.gameState === STATE_LOST) {
        return 'player-lost';
      } else if (this.gameState === STATE_WON) {
        return 'player-won';
      }
      return 'player-rest';
    },
  },

  methods: {
    openMenu() {
      play(SFX_MENU_OPEN);
      this.$store.commit('openModal', MODAL_SETTINGS);
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

.left-section {
  flex: 0 0 96px;
}

.right-section {
  display: flex;
  flex: 0 0 96px;
  justify-content: flex-end;
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

.arrow {
  animation: bounce 2s infinite;
}


@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(-8px);
  }
  60% {
    transform: translateX(-4px);
  }
}

.player {
  width: var(--block-size);
  height: var(--block-size);
  cursor: pointer;
  outline: none;  
}

.player-rest {
  animation: rest 3s steps(1) infinite;  
}

@keyframes rest {
  0% {
    background-position: -144px 0;
  }
  95% {
    background-position: -144px -48px;
  }
  100% {
    background-position: -144px -48px;
  }
}

.player-won {
  animation: won 3s steps(1) infinite;  
}

@keyframes won {
  0% {
    background-position: -144px -192px;
  }
  95% {
    background-position: -144px -240px;
  }
  100% {
    background-position: -144px -240px;
  }
}

.player-lost {
  background-position: -144px -96px;
}
</style>

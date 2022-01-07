<template>
  <div class="score-board">
    <div>
      💣 {{ mines - flags }}
    </div>
    <div>
      <button @click="resetGame">
        {{ gameStateLabel }}
      </button>
    </div>
    
    <div>
      00:00
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { STATE_LOST } from '@/utils/constants';

export default {
  name: 'ScoreBoard',
  
  computed: {
    ...mapState([
      'flags',
      'mines',
      'gameState',
    ]),

    gameStateLabel() {
      if (this.gameState === STATE_LOST) {
        return '😵'
      } else {
        return '🙂';
      }
    },
  },

  methods: {
    resetGame() {
      this.$store.dispatch('resetGame');
    },
  }
}
</script>

<style scoped>
.score-board {
  display: flex;
  gap: 36px;
}
</style>

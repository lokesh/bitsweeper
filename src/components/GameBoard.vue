<template>
  <div class="game-board">
    <score-board class="score-board" />
    <minefield
      class="minefield"
      :style="minefieldStyle"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Minefield from '@/components/Minefield';
import ScoreBoard from '@/components/ScoreBoard';

export default {
  name: 'GameBoard',
  components: {
    Minefield,
    ScoreBoard,
  },
  
  props: {
    msg: String
  },

  created() {
     this.$store.dispatch('resetGame');
  },

  computed: {
    ...mapState([
      'rows',
    ]),

    // Shift small minefields down away from the scoreboard.
    minefieldStyle(){
      return {
        marginTop: `${Math.max(0, 12 - this.rows) * 12}px`,
      }
    }
  }
}
</script>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
/*  min-height: 90vh;*/
  user-select: none;
}

.score-board {
  width: calc(var(--block-size) * var(--cols));
}

.minefield {
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
</style>

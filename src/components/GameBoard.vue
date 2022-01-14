<template>
  <div class="game-board">
    <score-board class="score-board" />
    <mine-field class="mine-field" />
  </div>
</template>

<script>
import MineField from '@/components/MineField';
import ScoreBoard from '@/components/ScoreBoard';

export default {
  name: 'GameBoard',
  components: {
    MineField,
    ScoreBoard,
  },
  
  props: {
    msg: String
  },

  created() {
     this.$store.dispatch('resetGame');
  }
}
</script>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  user-select: none;
}

.score-board {
  width: calc(var(--block-size) * var(--cols));
}

.mine-field {
  flex: 1 0 auto;
  display: flex;
  align-items: center;
}
</style>

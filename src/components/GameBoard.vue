<template>
  <div class="game-board">
    <score-board class="score-board" />
    <mine-field />
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
  user-select: none;
}

.score-board {
  width: calc(var(--block-size) * var(--cols));
}
</style>

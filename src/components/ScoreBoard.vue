<template>
  <div class="score-board">
    {{ gameState }}
    ...
    Mines {{ mines }}
    ...
    Timer 00:00
    ...
    Settings
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ScoreBoard',
  
  computed: {
    ...mapState([
      'mines',
      'gameState',
    ]),
  }
}
</script>

<style scoped>
.score-board {
  display: flex;
}
</style>

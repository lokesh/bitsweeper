<template>
  <div class="score-board">
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
    ]),
  }
}
</script>

<style scoped>
.score-board {
  display: flex;
}
</style>

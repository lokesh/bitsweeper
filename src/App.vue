<template>
  <div class="app">
    <game-board />
  </div>
</template>

<script>
import GameBoard from '@/components/GameBoard.vue'

export default {
  name: 'App',
  components: {
    GameBoard,
  },
}
</script>

<style>
@import "./styles/base.css";
</style>

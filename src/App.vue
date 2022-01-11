<template>
  <div class="app">
    <game-board />
  </div>
</template>

<script>
import GameBoard from '@/components/GameBoard.vue'
import { preloadSounds } from '@/utils/sound.js';

export default {
  name: 'App',
  components: {
    GameBoard,
  },

  mounted() {
    preloadSounds();
    document.addEventListener('visibilitychange', this.onVisibilityChange, false);
  },

  unmounted() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  },

  methods: {
    // Sounds would not play after switching tabs in iOS or putting device to sleep 
    // and revisiting the open tab. Preloading the files again seems to resolve it. 
    onVisibilityChange() {
      if (document.visibilityState === 'visible') {
        preloadSounds();
      }
    },
  }
}
</script>

<style>
@import "./styles/base.css";
</style>

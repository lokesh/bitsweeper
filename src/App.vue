<template>
  <div
    class="app"
    :class="appClass"
  >
    <game-board />
    <settings-modal v-if="modal === MODAL_SETTINGS" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GameBoard from '@/components/GameBoard.vue'
import SettingsModal from '@/components/SettingsModal';
import { MODAL_SETTINGS } from '@/utils/constants';
import { preloadSounds } from '@/utils/sound';

export default {
  name: 'App',
  components: {
    GameBoard,
    SettingsModal,
  },

  data() {
    return {
      MODAL_SETTINGS,
    };
  },

  computed: {
    ...mapState([
      'modal',
      'theme',
    ]),
  
    appClass() {
      return `theme-${this.theme}`;
    },
  },

  watch: {
    modal(val, oldVal) {
      // If modal still open, or modal still closed, don't do anything
      if (!!val === !!oldVal) return;

      if (val) {
        this.disableScrolling();
      } else {
        this.enableScrolling();
      }
    },
  },

  mounted() {
    preloadSounds();
    document.addEventListener('visibilitychange', this.onVisibilityChange, false);
  },

  unmounted() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  },

  methods: {
    disableScrolling() {
      document.body.classList.add('modal-open');
    },

    enableScrolling() {
      document.body.classList.remove('modal-open');
    },

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

<style scoped>
.app {
  min-height: 100vh;
}
</style>

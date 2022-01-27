<template>
  <div
    class="app"
    :class="appClass"
  >
    <game-board />
    
    <settings-modal v-if="modal === MODAL_SETTINGS" />
    <title-modal v-if="modal === MODAL_TITLE" />
    
    <particles class="particles" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Particles from '@/components/Particles.vue'
import GameBoard from '@/components/GameBoard.vue'
import SettingsModal from '@/components/SettingsModal';
import TitleModal from '@/components/TitleModal';
import {
  MODAL_SETTINGS,
  MODAL_TITLE,
  THEME_CONFIGS
} from '@/utils/constants';
import { preloadSounds } from '@/utils/sound';

export default {
  name: 'App',
  components: {
    Particles,
    GameBoard,
    SettingsModal,
    TitleModal,
  },

  data() {
    return {
      MODAL_SETTINGS,
      MODAL_TITLE,
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

    theme: {
      handler: function (val) {
        document.documentElement.style.setProperty('--color-bg', THEME_CONFIGS[val].bg);
        document.documentElement.style.setProperty('--color-overlay', THEME_CONFIGS[val].overlay);
      },
      immediate: true,
      
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
.particles {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
</style>

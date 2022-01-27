<template>
  <div class="overlay">
    <div class="content">
      <sprite
        class="logo"
        :x="48"
        :y="12"
        :width="43"
        :height="8"
      />

      <div class="options">
        <sprite
          class="difficulty"
          :x="48"
          :y="24"
          :width="21"
          :height="21"
          aria-role="button"
          tabindex="0"
          @click="toggleDifficulty"
          @keyup.enter.space="toggleDifficulty"      
        >
          <sprite
            class="mine-icon" 
            :width="4"
            :height="6"
            :x="88"
            :y="0"
          />
          <number :value="mines" />
      </sprite>

        <sprite
          class="themes"
          :x="48"
          :y="24"
          :width="21"
          :height="21"
          aria-role="button"
          tabindex="0"
          @click="toggleTheme"
          @keyup.enter.space="toggleTheme"
        >
          <sprite
            class="themes"
            :x="72"
            :y="24"
            :width="17"
            :height="17"
          />
        </sprite>
      </div>

      <div class="bottom-row">
        <div
          class="back-button"
          aria-role="button"
          tabindex="0"
          @click="closeSettings"
          @keyup.enter.space="closeSettings"        
        >
          <sprite
            :x="48"
            :y="48"
            :width="5"
            :height="5"
          />
          <pixel-string value="Back" />  
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Number from '@/components/Number';
import Sprite from '@/components/Sprite';
import PixelString from '@/components/PixelString';
import {
  DIFFICULTIES,
  SFX_BUTTON,
  SFX_MENU_CLOSE,
} from '@/utils/constants';
import { play } from '@/utils/sound';

export default {
  name: 'SettingsModal',

  components: {
    Number,
    PixelString,
    Sprite,
  },

  data() {
    return {
      DIFFICULTIES,
    };
  },

  computed: {
    ...mapState([
      'difficulty',
    ]),

    mines() {
      return String(DIFFICULTIES[this.difficulty].mines);
    },
  },

  methods: {
    closeSettings() {
      play(SFX_MENU_CLOSE);
      this.$store.commit('closeModal');
    },
    
    toggleDifficulty() {
      play(SFX_BUTTON);
      this.$store.dispatch('toggleDifficulty');
    },
    
    toggleTheme() {
      play(SFX_BUTTON);
      this.$store.dispatch('toggleTheme');
    },
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding-top: 144px;
  background: var(--color-overlay);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.options {
  display: flex;
  gap: 8px;
}

.difficulty {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  outline: none;
}

.themes {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  padding: 4px;
}

.bottom-row {
  width: 180px;
}

.back-button {
  cursor: pointer;
  display: flex;
}
</style>

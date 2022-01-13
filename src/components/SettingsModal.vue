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
          <number :value="remainingMinesCount" />
      </sprite>

        <sprite
          class="themes"
          :x="48"
          :y="24"
          :width="21"
          :height="21"
        />
      </div>

      <div class="bottom-row">
        <sprite
          class="back"
          :x="48"
          :y="48"
          :width="20"
          :height="5"
          aria-role="button"
          tabindex="0"
          @click="closeSettings"
          @keyup.enter.space="closeSettings"        
        />
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Number from '@/components/Number';
import Sprite from '@/components/Sprite';
import {
  DIFFICULTIES,
  SFX_FLAG,
  SFX_OPEN,
} from '@/utils/constants';
import { play } from '@/utils/sound';

export default {
  name: 'SettingsModal',

  components: {
    Number,
    Sprite,
  },

  data() {
    return {
      DIFFICULTIES,
    };
  },

  computed: {
    ...mapGetters([
      'remainingMinesCount',
    ]),

    ...mapState([
      'difficulty',
    ]),

    mines() {
      return DIFFICULTIES[this.difficulty].mines;
    },
  },

  methods: {
    closeSettings() {
      this.$store.commit('closeModal');
    },
    toggleDifficulty() {
      this.$store.dispatch('toggleDifficulty');
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
}

.bottom-row {
  width: 180px;
}

.back {
  cursor: pointer;
}
</style>

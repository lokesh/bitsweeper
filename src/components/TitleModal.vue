<template>
  <div class="overlay">
    <div class="content">
      <sprite
        class="logo"
        :x="36"
        :y="72"
        :width="88"
        :height="23"
      />

      <sprite
        class="start-button"
        :x="48"
        :y="60"
        :width="43"
        :height="11"
        aria-role="button"
        tabindex="0"
        @click="close"
        @keyup.enter.space="close"
      />

      <div class="help">
       <!--  <pixel-string class="help-item" value="Controls" style="padding-bottom: 12px; border-bottom: 4px solid white;" /> -->
        <template v-if="hasMouse">
          <!-- <pixel-string class="help-item" value="Click to open" /> -->
          <pixel-string class="help-item" value="Tip:Right click" />  
          <pixel-string class="help-item" value="to add a flag" />  
        </template>
        <template v-else>
          <!-- <pixel-string class="help-item" value="Tap to open" /> -->
          <pixel-string class="help-item" value="Tip:Long press" />  
          <pixel-string class="help-item" value="to add a flag" />  
        </template>
      </div>

    </div>
  </div>
</template>

<script>
import Sprite from '@/components/Sprite';
import PixelString from '@/components/PixelString';
import {
  SFX_MENU_CLOSE,
} from '@/utils/constants';
import { play } from '@/utils/sound';

export default {
  name: 'TitleModal',

  components: {
    PixelString,
    Sprite,
  },

  computed: {
    hasMouse() {
      return matchMedia('(pointer:fine)').matches;
    },
  },

  methods: {
    close() {
      play(SFX_MENU_CLOSE);
      this.$store.commit('closeModal');
    },
  },
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

.help {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  gap: 16px;
}

.bottom-row {
  width: 180px;
}

.start-button {
  margin-bottom: 48px;
  cursor: pointer;
}
</style>

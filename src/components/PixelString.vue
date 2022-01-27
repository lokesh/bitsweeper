<template>
  <div class="string">
    <div
      v-for="(letter, i) in letters"
      :key="i"
      class="g-sprite letter"
      :style="getStyleForLetter(letter)"
      role="img"
      :aria-label="letter"
    >
    </div>
  </div>
</template>

<script>

export default {
  name: 'PixelString',
  
  props: {
    value: String,
  },

  computed: {
    letters() {
      return this.value.split('');
    },
  },

  methods: {
    getStyleForLetter(letter) {
      let letterCode = letter.toLowerCase().charCodeAt(0) - 97;
      let letterIndex = letterCode;
      
      if (letterCode === -65) { // Space
        letterIndex = 27;
      } else if (letterCode === -39) { // Colon
        letterIndex = 26;
      }       
      
      const leftOffset = -192 - (letterIndex * 16);

      return {
        backgroundPosition: `${leftOffset}px -24px`,
      };
    },
  }
}
</script>

<style scoped>
.string {
  --letter-width: 12px;
  --letter-height: 20px;
  display: flex;
}

.letter {
  width: var(--letter-width);
  height: var(--letter-height);
  margin-right: calc(1px * var(--pixel-size));
}
</style>

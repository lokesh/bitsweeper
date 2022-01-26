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
  name: 'String',
  
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
      let letterIndex = letter.toLowerCase().charCodeAt(0) - 97;
      
      // Space has a letter index of -65
      letterIndex = (letterIndex < 0) ? 26 : letterIndex;

      let leftOffset = -192 - (letterIndex * 16);

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

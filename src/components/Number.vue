<template>
  <div class="number">
    <div
      v-for="(digit, i) in digits"
      :key="i"
      class="g-sprite digit"
      :style="getStyleForDigit(Number(digit))"
      role="img"
      :aria-label="digit"
    >
    </div>
  </div>
</template>

<script>

export default {
  name: 'Number',
  
  props: {
    value: String,
  },

  computed: {
    digits() {
      return this.value.split('');
    },
  },

  methods: {
    getStyleForDigit(digit) {
      let leftOffset = -192 - (digit * 16);
      return {
        backgroundPosition: `${leftOffset}px 0`,
      };
    },
  }
}
</script>

<style scoped>
.number {
  --digit-width: 12px;
  --digit-height: 20px;
  display: flex;
}

.digit {
  width: var(--digit-width);
  height: var(--digit-height);
  margin-right: calc(1px * var(--pixel-size));
}
</style>

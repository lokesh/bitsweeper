<template>
  <div>
    <div
      class="block"
      aria-role="button"
      tabindex="0"
      @click="onClick"
      @keyup.enter="onClick"
      @keyup.space.prevent="onClick"
    >
      1
    </div>
  </div>
</template>

<script>
export default {
  name: 'Block',
  props: {
    msg: String
  },

  methods: {
    onClick() {
      console.log('clack');
    },
  }
}
</script>

<style scoped>
.block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--block-size);
  height: var(--block-size);
  background: var(--color-bg);
  border: 1px solid var(--color);
  font-weight: bold;
  user-select: none;
  cursor: pointer;
}

.block:hover {
  background: #666;
}

.block:focus {
  background: #999;
}
</style>

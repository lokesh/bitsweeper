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
  background: #444;
  border: 1px solid #fff;
}

.block:focus {
  background: #999;
}
</style>

<template>
  <div>
    <h1>Field</h1>
    <div
      class="field"
      :style="fieldStyles"
    >
      <block
        v-for="i in (rows * cols)"
        :key="i"
      >
        {{ i }}
      </block>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Block from './Block';

export default {
  name: 'Field',
  
  components: {
    Block,
  },

  props: {
    msg: String
  },

  computed: {
    ...mapState([
      'rows',
      'cols',
    ]),

    fieldStyles() {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${this.cols}, var(--block-size))`,
      };
    }
  },

}
</script>

<style scoped>

</style>

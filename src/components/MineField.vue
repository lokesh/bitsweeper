<template>
  <div>
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
import Block from '@/components/Block';

export default {
  name: 'MineField',
  
  components: {
    Block,
  },

  props: {
    msg: String
  },

  computed: {
    ...mapState([
      'field',
    ]),

    rows() {
      return this.field.length;
    },

    cols() {
      return this.field[0].length;
    },

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

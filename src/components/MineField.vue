<template>
  <div>
    <div
      class="field"
      :style="fieldStyles"
    >
      <block
        v-for="(block, i) in blocks"
        :key="i"
        :block="block"
      />
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

    blocks() {
      let blocks = [];
      this.field.forEach(row => {
        row.forEach(block => {
          blocks.push(block);
        })
      })
      return blocks;
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

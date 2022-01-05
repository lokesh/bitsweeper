import { createStore } from 'vuex';
import Block from '../classes/Block';

export default createStore({
  state: {
    rows: 10,
    cols: 10,
    mines: 20,
    field: [],
    difficulty: null,
  },
  mutations: {
    addMinesToField() {

    },

    setDifficulty() {

    },

    setField(state, val) {
      state.field = val;
    },
  },
  actions: {
    resetGame({ state, commit }) {
      // Create empty field
      const field = [];
      for (let i = 0; i < state.rows; i++) {
        field[i] = [];
        for (let j = 0; j < state.cols; j++) {
          field[i].push(new Block());
        }
      }

      commit('setField', field);
      // console.log(field);

      // Reset timer
    },

    startGame() {
      // Add mines to field
    },

  },
  modules: {
  }
})

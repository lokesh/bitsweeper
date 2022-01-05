import { createStore } from 'vuex';
import { STATE_ACTIVE, STATE_READY } from '@/utils/constants';
import Block from '@/classes/Block';

export default createStore({
  state: {
    rows: 10,
    cols: 10,
    mines: 20,
    field: [],
    difficulty: null,

    gameState: STATE_READY,
  },
  mutations: {
    addMinesToField(state) {
      console.log('add Mines');
      let minesAdded = 0;
      
      while (minesAdded < state.mines) {
        minesAdded++;
        console.log(minesAdded);
      }
    },

    setDifficulty() {

    },

    setField(state, val) {
      state.field = val;
    },

    setGameState(state, val) {
      state.gameState = val;
    }
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

      // Reset timer
    },

    startGame({ commit }) {
      commit('addMinesToField');
      commit('setGameState', STATE_ACTIVE);
    },

  },
})

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
      // Add mines
      let minesAdded = 0;
      
      while (minesAdded < state.mines) {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        let randBlock = state.field[row][col];
        if (!randBlock.isOpen && ~randBlock.hasMine) {
          state.field[row][col].hasMine = true;
          minesAdded++;  
        }
      }

      // Update neighborMinesCount
      console.log('update count');

      // for (let i = 0; i < state.rows; i++) {
      //   field[i] = [];
      //   for (let j = 0; j < state.cols; j++) {
      //     field[i].push(new Block());
      //   }
      // }

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
          field[i].push(new Block(i, j));
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

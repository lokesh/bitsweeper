import { createStore } from 'vuex';
import {
  STATE_ACTIVE,
  STATE_LOST,
  STATE_READY,
  STATE_WON,
} from '@/utils/constants';
import { getNeighbors } from '@/utils/index';
import Block from '@/classes/Block';
import {
  SFX_EXPAND,
  SFX_MINE,
  SFX_RESTART,
} from '@/utils/constants';
import { play } from '@/utils/sound';


export default createStore({
  state: {
    rows: 12,
    cols: 8,
    mines: 1,
    flags: 0, // Tracks how many flags have been planted
    blocksRemaining: null, // How many non-mine blocks left to open before win
    field: [],
    difficulty: null,

    gameState: STATE_READY,
  },
  mutations: {
    addFlag(state, val) {
      state.field[val.row][val.col].flagged = true;
    },

    addMinesToField(state) {
      // Add mines
      let minesAdded = 0;
      
      while (minesAdded < state.mines) {
        let row = Math.floor(Math.random() * state.rows);
        let col = Math.floor(Math.random() * state.cols);
        let randBlock = state.field[row][col];
        if (!randBlock.isOpen && !randBlock.hasMine) {
          state.field[row][col].hasMine = true;
          minesAdded++;  
        }
      }

      // Update neighborMinesCount for all blocks
      for (let row = 0; row < state.rows; row++) {
        for (let col = 0; col < state.cols; col++) {
          let neighbors = getNeighbors(row, col, state.field);    
          let count = neighbors.reduce((mineCount, neighbor) => {
            return mineCount += (neighbor.hasMine) ? 1 : 0;
          }, 0);
          state.field[row][col].neighborMinesCount = count;
        }
      }
    },

    decrementFlagCount(state) {
      state.flags--;
    },

    incrementFlagCount(state) {
      state.flags++;
    },

    setBlockToOpen(state, val) {
      state.field[val.row][val.col].isOpen = true;
    },

    setDifficulty() {

    },

    setField(state, val) {
      state.field = val;
    },

    removeFlag(state, val) {
      state.field[val.row][val.col].flagged = false;
    },

    // We run this after the initial click on the field, so one block has already
    // been opened, thus we need to minus 1.
    resetBlocksRemaining(state) {
      state.blocksRemaining = (state.rows * state.cols) - state.mines; 
    },

    setFlagCount(state, val) {
      state.flags = val;
    },

    setGameState(state, val) {
      state.gameState = val;
    }
  },
  actions: {
    loseGame({ commit }) {
      play(SFX_MINE);
      commit('setGameState', STATE_LOST);
    },

    openBlock({ state, dispatch }, block) {
      const { row, col, hasMine } = block;
      state.field[row][col].isOpen = true;

      // If mine, end game
      if (hasMine) {
        dispatch('loseGame');
        return;
      }

      state.blocksRemaining--;

      // Last block?
      if (state.blocksRemaining <= 0) {
        dispatch('winGame');
        return;
      }

      if (block.neighborMinesCount > 0) {
        return;
      }

      let neighbors = getNeighbors(block.row, block.col, state.field);

      /*
        Expand outward. If neighbor has a 0 neighborsMinesCount than add it's
        neighbors to stack.
       */
      while (neighbors.length > 0) {
        play(SFX_EXPAND);
        let neighbor = neighbors.shift();
        
        if (neighbor.neighborMinesCount === 0
            && neighbor.hasMine === false
            && neighbor.isOpen === false
            && neighbor.flagged === false
        ) {
            state.blocksRemaining--;
            neighbor.isOpen = true;
            let newNeighbors = getNeighbors(neighbor.row, neighbor.col, state.field);

            newNeighbors = newNeighbors.filter(newNeighbor => {
              return (
                newNeighbor.hasMine === false
                && newNeighbor.isOpen === false
                && newNeighbor.flagged === false
              );
            })
            neighbors.push(...newNeighbors);

        } else if (neighbor.neighborMinesCount !== 0
            && neighbor.hasMine === false
            && neighbor.isOpen === false
            && neighbor.flagged === false) {
          state.blocksRemaining--;
          neighbor.isOpen = true;
        }
      }

      // Last block?
      if (state.blocksRemaining <= 0) {
        dispatch('winGame');
      }      
    },

    toggleFlag({ commit }, block) { 
      if (block.flagged) {
        commit('removeFlag', block);
        commit('decrementFlagCount');
      } else {
        commit('addFlag', block);
        commit('incrementFlagCount');
      }
      
    },

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
      commit('setFlagCount', 0);
      commit('setGameState', STATE_READY);

      // Reset timer
    },

    startGame({ commit }) {
      commit('addMinesToField');
      commit('resetBlocksRemaining');
      commit('setGameState', STATE_ACTIVE);
    },

    winGame({ commit }) {
      play(SFX_RESTART);
      commit('setGameState', STATE_WON);
    },

  },
})

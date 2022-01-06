import { createStore } from 'vuex';
import { STATE_ACTIVE, STATE_LOST, STATE_READY } from '@/utils/constants';
import { getNeighbors, getNeighborsRowCol } from '@/utils/index';
import Block from '@/classes/Block';

export default createStore({
  state: {
    rows: 10,
    cols: 15,
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

    setBlockToOpen(state, val) {
      state.field[val.row][val.col].isOpen = true;
    },

    setDifficulty() {

    },

    setField(state, val) {
      state.field = val;
    },

    setFlag(state, val) {
      if (val.isOpen) return;

      state.field[val.row][val.col].flagged = true;
    },
    setGameState(state, val) {
      state.gameState = val;
    }
  },
  actions: {
    endGame({ commit }) {
      commit('setGameState', STATE_LOST);
    },

    openBlock({ state, commit, dispatch }, block) {
      const { row, col, hasMine } = block;
      state.field[row][col].isOpen = true;

      // If mine, end game
      if (hasMine) {
        dispatch('endGame');
        return;
      }

      if (block.neighborMinesCount > 0) {
        block.isOpen = true;
        return;
      }

      let neighbors = getNeighbors(block.row, block.col, state.field);
      // Expand outward
      // Add neighbors to stack, if any have 0 neighborMinesCount, then add
      // their neigbhors to stack
      // let neighborsRowCols = getNeighborsRowCol(row, col, state.rows, state.cols);
      // console.log(neighborsRowCols);
      // console.log(neighbors.length);

      while (neighbors.length > 0) {
        // console.log(neighbors.length);
        let neighbor = neighbors.shift();
        // console.log(neighbor);
        
        if (neighbor.neighborMinesCount === 0
            && neighbor.hasMine === false
            && neighbor.isOpen === false
            && neighbor.flagged === false
        ) {
            neighbor.isOpen = true;
            let newNeighbors = getNeighbors(neighbor.row, neighbor.col, state.field);
            // console.log('new', newNeighbors.length);

            newNeighbors = newNeighbors.filter(newNeighbor => {
              return (
                // newNeighbor.neighborMinesCount === 0
                newNeighbor.hasMine === false
                && newNeighbor.isOpen === false
                && newNeighbor.flagged === false
              );
            })
            // console.log('new', newNeighbors.length);
            // console.log(neighbors.length);
            neighbors.push(...newNeighbors);
            // console.log(neighbors.length);
            
          // neighbors.push(...);
        // }
        } else if (neighbor.neighborMinesCount !== 0
            && neighbor.hasMine === false
            && neighbor.isOpen === false
            && neighbor.flagged === false) {
          neighbor.isOpen = true;
        }
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

      // Reset timer
    },

    startGame({ commit }) {
      commit('addMinesToField');
      commit('setGameState', STATE_ACTIVE);
    },

  },
})

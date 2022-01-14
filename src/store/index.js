import { createStore } from 'vuex';
import {
  DIFFICULTIES,
  DIFFICULTY_EASY,
  DIFFICULTY_MEDIUM,
  DIFFICULTY_HARD,
  STATE_ACTIVE,
  STATE_LOST,
  STATE_READY,
  STATE_WON,
  SFX_EXPAND,
  SFX_LOSS,
  SFX_WIN,
  THEMES,
} from '@/utils/constants';
import { getNeighbors } from '@/utils/index';
import Block from '@/classes/Block';
import { play } from '@/utils/sound';

export default createStore({
  state: {
    difficulty: null,
    theme: null,

    rows: null,
    cols: null,
    mines: null,
    flags: 0, // Tracks how many flags have been planted
    blocksRemaining: null, // How many non-mine blocks left to open before win
    field: [],
    
    gameState: STATE_READY,

    modal: null, //'settings',
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

    closeModal(state) {
      state.modal = null;
    },

    decrementFlagCount(state) {
      state.flags--;
    },

    incrementFlagCount(state) {
      state.flags++;
    },


    openModal(state, val) {
      state.modal = val;
    },

    removeFlag(state, val) {
      state.field[val.row][val.col].flagged = false;
    },

    // We run this after the initial click on the field, so one block has already
    // been opened, thus we need to minus 1.
    resetBlocksRemaining(state) {
      state.blocksRemaining = (state.rows * state.cols) - state.mines; 
    },

    setBlockToOpen(state, val) {
      state.field[val.row][val.col].isOpen = true;
    },

    setCols(state, val) {
      state.cols = val;
    },

    setDifficulty(state, val) {
      state.difficulty = val;
    },

    setField(state, val) {
      state.field = val;
    },

    setFlagCount(state, val) {
      state.flags = val;
    },

    setGameState(state, val) {
      state.gameState = val;
    },

    setMines(state, val) {
      state.mines = val;
    },

    setRows(state, val) {
      state.rows = val;
    },

    setTheme(state, val) {
      state.theme = val;
    },
  },
  actions: {
    changeDifficulty({ commit, dispatch }, difficulty) {
      const config = DIFFICULTIES[difficulty];

      commit('setDifficulty', difficulty);
      commit('setRows', config.rows);
      commit('setCols', config.cols);
      commit('setMines', config.mines);

      dispatch('resetGame');
    },
    
    /*
      App.vue sets a class on root node for app 'theme-FOOBAZ'. 
      Theme styles are set in base.css.
     */
    changeTheme({ commit }, theme) {
      commit('setTheme', theme);
    },    

    loseGame({ commit }) {
      play(SFX_LOSS);
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

      let playingSound = false;

      /*
        Expand outward. If neighbor has a 0 neighborsMinesCount than add it's
        neighbors to stack.
       */
      while (neighbors.length > 0) {
        if (!playingSound) {
          play(SFX_EXPAND);
        }
        playingSound = true;

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

    toggleDifficulty({ state, dispatch }) {
      if (state.difficulty === DIFFICULTY_EASY) {
        dispatch('changeDifficulty', DIFFICULTY_MEDIUM);
      } else if (state.difficulty === DIFFICULTY_MEDIUM) {
        dispatch('changeDifficulty', DIFFICULTY_HARD);
      } else {
        dispatch('changeDifficulty', DIFFICULTY_EASY);
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

    toggleTheme({ state, dispatch }) {
      const index = THEMES.indexOf(state.theme);
      const newIndex = (index + 1) % THEMES.length;
      dispatch('changeTheme', THEMES[newIndex]);
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

    winGame({ state, commit }) {
      play(SFX_WIN);
      commit('setFlagCount', state.mines);
      commit('setGameState', STATE_WON);
    },
  },

  getters: {
    remainingMinesCount(state) {
      let str = String(Math.max(0, state.mines - state.flags));
      if (str.length < 2) {
        str = `0${str}`; 
      }
      return str;
    },
  },
})

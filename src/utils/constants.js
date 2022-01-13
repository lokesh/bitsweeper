export const MODAL_SETTINGS = 'settings';


export const DIFFICULTY_EASY = 'easy';
export const DIFFICULTY_MEDIUM = 'medium';
export const DIFFICULTY_HARD = 'hard';

export const DIFFICULTIES = {
  [DIFFICULTY_EASY]: {
    rows: 8,
    cols: 6,
    mines: 4,
  },
  [DIFFICULTY_MEDIUM]: {
    rows: 12,
    cols: 8,
    mines: 12,
  },
  [DIFFICULTY_HARD]: {
    rows: 24,
    cols: 8,
    mines: 24,
  }
}

export const STATE_READY = 'ready';
export const STATE_ACTIVE = 'active';
export const STATE_WON = 'won';
export const STATE_LOST = 'lost';

export const SFX_EXPAND = 'expand';
export const SFX_FLAG = 'flag';
export const SFX_MINE = 'mine';
export const SFX_OPEN = 'open';
export const SFX_RESTART = 'start';

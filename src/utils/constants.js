export const MODAL_SETTINGS = 'settings';
export const MODAL_TITLE = 'title';

export const DIFFICULTY_EASY = 'easy';
export const DIFFICULTY_MEDIUM = 'medium';
export const DIFFICULTY_HARD = 'hard';
export const DIFFICULTIES = {
  [DIFFICULTY_EASY]: {
    rows: 7,
    cols: 7,
    mines: 6,
  },
  [DIFFICULTY_MEDIUM]: {
    rows: 12,
    cols: 8,
    mines: 12, // 12
  },
  [DIFFICULTY_HARD]: {
    rows: 24,
    cols: 8,
    mines: 30,
  }
}

export const STATE_READY = 'ready';
export const STATE_ACTIVE = 'active';
export const STATE_WON = 'won';
export const STATE_LOST = 'lost';

/**
 * SOUND
 */

export const SFX_BUTTON = 'button';
export const SFX_EXPAND = 'expand';
export const SFX_FLAG = 'flag';
export const SFX_LOSS = 'loss';
export const SFX_MENU_OPEN = 'menuOpen';
export const SFX_MENU_CLOSE = 'menuClose';
export const SFX_OPEN = 'open';
export const SFX_RESTART = 'start';
export const SFX_WIN = 'win';

/**
 * VISUALS
 */

export const BLOCK_SIZE = 48;

// Each image pixel is rendered 4x
export const PIXEL_SIZE = 4;

export const THEME_1BIT = '1bit';
export const THEME_CONTRAST = 'contrast';
export const THEME_CGA = 'cga';
export const THEME_EGA = 'ega';
export const THEME_MUTED = 'muted';

export const THEME_LIST = [
  THEME_1BIT,
  THEME_CONTRAST,
  THEME_CGA,  
  THEME_EGA,
  THEME_MUTED,
]

/* NOTE: 'flagColor' refers to the particle color on the flag animation, and
does not always align the with flag block color. */
export const THEME_CONFIGS = {
  [THEME_1BIT]: {
    blockColor: '#d2fddb',
    flagColor: '#D2FDDB',
    bg: '#271c31',
    overlay: 'rgba(39, 28, 49, 0.95)',
  },
  [THEME_CONTRAST]: {
    blockColor: '#5e5750',
    flagColor: '#C2C3C6',
    bg: '#020408',
    overlay: 'rgba(2, 4, 8, 0.8)',
  },
  [THEME_CGA]: {
    blockColor: '#60fefd',
    flagColor: '#f365ee',
    bg: 'rgb(0, 0, 0)',
    overlay: 'rgba(0, 0, 0, 0.9)',
  },
  [THEME_EGA]: {
    blockColor: '#5084e2',
    flagColor: '#FFF7F8',
    bg: 'rgb(0, 0, 0)',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
  [THEME_MUTED]: {
    blockColor: '#e3e2d8',
    flagColor: '#dea76c',
    bg: 'rgb(25, 25, 25)',
    overlay: 'rgba(25, 25, 25, 0.93)',
  },
}

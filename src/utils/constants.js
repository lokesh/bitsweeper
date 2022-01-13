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

export const SFX_EXPAND = 'expand';
export const SFX_FLAG = 'flag';
export const SFX_MINE = 'mine';
export const SFX_OPEN = 'open';
export const SFX_RESTART = 'start';

/**
 * VISUALS
 */

// Each image pixel is rendered 4x
export const PIXEL_SIZE = 4;

export const THEME_1BIT = '1bit';
export const THEME_CONTRAST = 'contrast';
export const THEME_EGA = 'ega';
// export const THEME_PICO = 'pico';

export const THEMES = [
  THEME_1BIT,
  THEME_CONTRAST,
  THEME_EGA,
  // THEME_PICO,
]
// export const THEMES = {
//   [THEME_1BIT]: {
//     src: 'sprite-1bit.png',
//     bg: '#271C31',
//     overlay:'rgba(39, 28, 49, 0.95)',
//   },
//   [THEME_CONTRAST]: {
//     src: 'sprite-contrast.png',
//     bg: '#020408',
//     overlay:'rgba(39, 28, 49, 0.95)',
//   },
//   [THEME_PICO]: {
//     src: 'sprite-pico.png',
//     bg: '#1F2C50',
//     overlay:'rgba(39, 28, 49, 0.95)',
//   }
// };


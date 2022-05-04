import { Howl } from 'howler';
import {
  SFX_BUTTON,
  SFX_EXPAND,
  SFX_FLAG,
  SFX_LOSS,
  SFX_MENU_OPEN,
  SFX_MENU_CLOSE,
  SFX_OPEN,
  SFX_RESTART,
  SFX_WIN,
} from '@/utils/constants';

const masterVol = 1;

let flag;
let loss, win;
let open;
let expand;
let restart;
let menuOpen, menuClose;
let button;

const url = (process.env.NODE_ENV === 'development')
  ? 'http://localhost:8080/'
  : process.env.BASE_URL;

export const preloadSounds = () => {
  flag = new Howl({
    src: [`${url}/sound/flag.wav`], // flag 1 or 3 
    volume: 0.5 * masterVol,
  });

  loss = new Howl({
    src: [`${url}/sound/loss.wav`],
    volume: 0.5 * masterVol,
  });

  win = new Howl({
    src: [`${url}/sound/win.wav`],
    volume: 0.6 * masterVol,
  });

  open = new Howl({
    src: [`${url}/sound/open.wav`],
    volume: 1.0 * masterVol,
  });

  expand = new Howl({
    src: [`${url}/sound/expand.wav`],
    volume: 0.6 * masterVol,
  });

  restart = new Howl({
    src: [`${url}/sound/restart.wav`],
    volume: 0.5 * masterVol,
  });

  menuOpen = new Howl({
    src: [`${url}/sound/menu-open.wav`],
    volume: 0.9 * masterVol,
  });

  menuClose= new Howl({
    src: [`${url}/sound/menu-close.wav`],
    volume: 0.9 * masterVol,
  });

  button = new Howl({
    src: [`${url}/sound/button.wav`],
    volume: 0.9 * masterVol,
  });

}

export const play = (sound) => {
  switch (sound) {
    case SFX_BUTTON:
      button.play();
      break;
    case SFX_EXPAND:
      expand.play();
      break;
    case SFX_FLAG:
      flag.play();
      break;
    case SFX_LOSS:
      loss.play();
      break;
    case SFX_WIN:
      win.play();
      break;
    case SFX_MENU_OPEN:
      menuOpen.play();
      break;
    case SFX_MENU_CLOSE:
      menuClose.play();
      break;
    case SFX_OPEN:
      open.play();
      break;
    case SFX_RESTART:
      restart.play();
      break;
  }

}

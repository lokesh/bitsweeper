import { Howl } from 'howler';
import {
  SFX_EXPAND,
  SFX_FLAG,
  SFX_MINE,
  SFX_OPEN,
  SFX_RESTART
} from '@/utils/constants';

const masterVol = 0.6;

let flag;
let mine;
let open;
let expand;
let restart;

export const preloadSounds = () => {
  flag = new Howl({
    src: ['/sound/open2.wav'],
    volume: 0.3 * masterVol,
  });

  mine = new Howl({
    src: ['/sound/mine.wav'],
    volume: 0.5 * masterVol,
  });

  open = new Howl({
    src: ['/sound/open.wav'],
    volume: 0.4 * masterVol,
  });

  expand = new Howl({
    src: ['/sound/open3.wav'],
    volume: 0.2 * masterVol,
  });

  restart = new Howl({
    src: ['/sound/restart.wav'],
    volume: 0.9 * masterVol,
  });

}

export const play = (sound) => {
  switch (sound) {
    case SFX_EXPAND:
      expand.play();
      break;
    case SFX_FLAG:
      flag.play();
      break;
    case SFX_MINE:
      mine.play();
      break;
    case SFX_OPEN:
      open.play();
      break;
    case SFX_RESTART:
      restart.play();
      break;
  }

}

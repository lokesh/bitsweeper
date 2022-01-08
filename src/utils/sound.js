import { Howl } from 'howler';
import {
  SFX_EXPAND,
  SFX_FLAG,
  SFX_MINE,
  SFX_OPEN,
  SFX_RESTART
} from '@/utils/constants';

const flag = new Howl({
  src: ['/sound/open2.wav']
});

const mine = new Howl({
  src: ['/sound/mine.wav']
});

const open = new Howl({
  src: ['/sound/open.wav']
});

const expand = new Howl({
  src: ['/sound/open3.wav']
});

const restart = new Howl({
  src: ['/sound/restart.wav']
});

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

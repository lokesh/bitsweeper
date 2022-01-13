const spriteSize = 48;

const spritePositions = {
  0: '0,0',
  1: '1,0',
  2: '2,0',
  3: '3,0',
  4: '4,0',
  5: '5,0',
  6: '6,0',
  7: '7,0',
  8: '8,0',
  'block': ['0,1','1,1','2,1','3,1','4,1','5,1','6,1','7,1','8,1'],
  'flag': '0,2',
  'mine': '1,2',
  'menu': '2,2',
  'p-rest': '0,3',
  'p-rest-blink': '7,3',
  'p-unsure': '1,3',
  'p-won': '0,3',
  'p-loss': '3,3',
  'arrow-right': '2, 3',
};

/**
 * Looks up sprite name in spritePositions and returns css background position
 * for sprite in spritesheet
 * @param  {String} sprite 
 * @return {String} css background position value
 */
export const getSpritePosition = function(sprite) {
  let spec = spritePositions[sprite];      
  let rowCol;
  
  if (typeof spec === 'string') {
    rowCol = spec.split(',');  
  } else {
    let randIndex = Math.floor(Math.random() * spec.length);
    rowCol = spec[randIndex].split(',');
  }
  
  let x = rowCol[1] * spriteSize * -1;
  let y = rowCol[0] * spriteSize * -1;

  return  `${x}px ${y}px`;
}

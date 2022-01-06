/**
 * [description]
 * @param  {Number} row index
 * @param  {Number} col index
 * @param  {Number} rowCount
 * @param  {Number} colCount
 * @return {Number[][]} 
 *
 * @example 
 * [[1, 2], [1, 3], [1, 4], [2, 2], [2, 4], [3, 2], [3, 3], [3, 4]]
 */

export const getNeighbors = (row, col, rowCount, colCount) => {
  let neighbors = [
    [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
    [row, col - 1], [row, col + 1],
    [row + 1, col - 1], [row + 1, col], [row + 1, col + 1],
  ]

  neighbors = neighbors.filter(coords => {
    let row = coords[0];
    let col = coords[1];
    return (row >= 0 && row < rowCount && col >= 0 && col < colCount);
  })
  return neighbors;
};


// export const isPangram = (word) => {
//   return new Set(word.split('')).size === 7;
// }

/**
 * Get array of [row, col] coordinates for valid neighbors
 * @param  {Number} row index
 * @param  {Number} col index
 * @param  {Number} rowCount
 * @param  {Number} colCount
 * @return {Number[][]} 
 *
 * @example 
 * [[1, 2], [1, 3], [1, 4], [2, 2], [2, 4], [3, 2], [3, 3], [3, 4]]
 */
export const getNeighborsRowCol = (row, col, rowCount, colCount) => {
  let neighbors = [
    [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
    [row, col - 1], [row, col + 1],
    [row + 1, col - 1], [row + 1, col], [row + 1, col + 1],
  ]

  neighbors = neighbors.filter(rowCol => {
    let row = rowCol[0];
    let col = rowCol[1];
    return (row >= 0 && row < rowCount && col >= 0 && col < colCount);
  })
  return neighbors;
};

export const getNeighbors = (row, col, field) => {
  const firstRow = Math.max(row - 1, 0);
  const lastRow = Math.min(row + 1, field.length - 1);
  const firstCol = Math.max(col - 1, 0);
  const lastCol = Math.min(col + 1, field[0].length - 1);
  
  let neighbors = [];
  for (let i = firstRow; i <= lastRow; i++) {
    for ( let j = firstCol; j <= lastCol; j++) {
      if (!(i === row && j === col)) { 
        neighbors.push(field[i][j]);
      }
    }
  }
  return neighbors;
};



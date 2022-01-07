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



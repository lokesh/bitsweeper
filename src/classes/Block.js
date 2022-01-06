export default class Block {
  constructor(row, col) {
    this.row = row;
    this.col = col;

    this.neighborMinesCount = 0;
    this.hasMine = false;
    this.isOpen = false;
    this.flagged = false;
  }
}

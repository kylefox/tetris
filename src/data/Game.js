import Pieces from './pieces';
import Court from './court';

export default class Game {

  constructor() {
    this.reset();
  }

  reset() {
    this.court = new Court();
    this.pieces = new Pieces();
    this.currentPiece = this.pieces.next();
  }

  update() {
    // If the next Y increment will collide, freeze the piece and generate a new one.
    if(this.willVerticallyCollide()) {
      this.court.freeze(this.currentPiece);
      this.currentPiece = this.pieces.next();
    } else {
      this.currentPiece.y += 1;
    }
  }

  willVerticallyCollide() {
    // TODO: Do we actually need to re-check this every update? *the court is static.*
    // Once a piece is frozen we can calculate the highest point in each column in the court.
    // Would be an array where index are column indexes and elements are the highest cell (y value) that has a block (or undefined if no blocks in that column).

    // Iterate from bottom up, ex: check lower rows first.
    let rows = this.currentPiece.rows();
    for(let rowIndex=rows.length-1; rowIndex>=0; rowIndex--) {
      // TODO: skip completely empty rows and columns.
      let columns = rows[rowIndex];
      let numColumns = columns.length;
      for(let columnIndex=0; columnIndex<numColumns; columnIndex++) {
        if(columns[columnIndex]) {
          // There's a block in this cell. Check to see if the court is empty in the next slot down.
          if(!this.court.cellAvailable(this.currentPiece.x+columnIndex, this.currentPiece.y+rowIndex+1)) {
            return true;
          }
        }
      }
    }
    return false;
  }

}

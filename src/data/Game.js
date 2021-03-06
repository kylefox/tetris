import Pieces from './pieces';
import Court from './court';


const GameState = {
  READY: 'READY',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  OVER: 'OVER',
};


export default class Game {

  constructor() {
    this.reset();
  }

  reset() {
    this.court = new Court();
    this.pieces = new Pieces();
    this.state = GameState.READY;
  }

  start() {
    this.reset();
    this.state = GameState.RUNNING;
    this.generateNextPiece();
  }

  pause() {
    if(this.isRunning()) {
      this.state = GameState.PAUSED;
    } else {
      throw new Error(`Can't pause game in ${this.state} state.`);
    }
  }

  unpause() {
    if(this.isPaused()) {
      this.state = GameState.RUNNING;
    } else {
      throw new Error(`Can't pause game in ${this.state} state.`);
    }
  }

  end() {
    this.state = GameState.OVER;
  }

  isPaused() {
    return this.state === GameState.PAUSED;
  }

  isRunning() {
    return this.state === GameState.RUNNING;
  }

  update() {
    if(this.state === GameState.RUNNING) {
      if(!this.moveDown()) {
        this.next();
      }
    }
  }

  next() {
    this.court.freeze(this.currentPiece);
    this.court.clearFullRows();
    this.generateNextPiece();
  }

  generateNextPiece() {
    this.currentPiece = this.pieces.next();
    this.currentPiece.y = 0;
    // Can hardcode -2 because we know each block is a 4x4 grid
    this.currentPiece.x = this.court.width/2 - 2;
  }

  drop() {
    while(this.moveDown()) { };
    this.next();
  }

  moveDown() {
    if(!this.willVerticallyCollide()) {
      this.currentPiece.y += 1;
      return true;
    }
    return false;
  }

  moveRight() {
    if(this.court.allowMoveRight(this.currentPiece)) {
      this.currentPiece.x++;
      return true;
    }
    return false;
  }

  moveLeft() {
    if(this.court.allowMoveLeft(this.currentPiece)) {
      this.currentPiece.x--;
      return true;
    }
    return false;
  }

  rotate() {
    if(this.court.allowRotation(this.currentPiece)) {
      this.currentPiece.rotate();
    }
    return false;
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

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
    this.currentPiece.y += 1;

    // If the next Y increment will collide, freeze the piece and generate a new one.
    if(this.currentPiece.y + 1 > this.court.height-4) {
      this.court.freeze(this.currentPiece);
      this.currentPiece = this.pieces.next();
    }
  }

}

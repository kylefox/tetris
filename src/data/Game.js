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

    // this.court.freeze(this.currentPiece);
  }

  update() {
    this.currentPiece.y += 1;
  }

}

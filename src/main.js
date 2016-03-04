import Pieces from './pieces';

let pieces = new Pieces();

let piece = pieces.next();

setInterval(function () {
  piece.debug();
  piece.rotate();
  if(piece.rotationIndex % 4 === 0) {
    piece = pieces.next();
    console.log(`Next piece: ${piece.label}`);
  }
}, 1000);

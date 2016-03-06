import Game from './data/game';
import Graphics from './graphics';

// Initialize Canvas
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const game = new Game();
const graphics = new Graphics(game, canvas);

function tick() {
  game.update();
  graphics.draw();
}

setInterval(tick, 100);
tick();

window.addEventListener('keydown', function(event) {
  if(event.which === 39) {
    game.moveRight();
    graphics.draw();
  } else if(event.which === 37) {
    game.moveLeft();
    graphics.draw();
  } else if(event.which === 38) {
    game.rotate();
    graphics.draw();
  }
  console.log(event.which);
});

// const court = new Court();
// const pieces = new Pieces();
// const graphics = canvas.getContext('2d');
// const scale = 15;
//
// // canvas.width = court.width * scale;
// // canvas.height = court.height * scale;
//
//
// let piece = pieces.next();
//
// piece.y = 100;
// court.freeze(piece);
// // court.debug();
// piece = pieces.next();
// // court.freeze(piece);
// // court.debug();
//
// function tick() {
//   graphics.clearRect(0, 0, canvas.width, canvas.height);
//
//   drawCourt(court);
//   drawPiece(piece, graphics);
//
//   piece.y += 1;
//   // piece.x += 1;
//   // piece.rotate();
//
//   if(piece.y*scale > 150) {
//     court.freeze(piece);
//     piece = pieces.next();
//   }
//
//   graphics.strokeStyle = '#bbb';
//   graphics.lineWidth = 1;
//   graphics.strokeRect(0, 0, canvas.width, canvas.height);
//   graphics.lineWidth = 0.5;
//   for(let row=0; row<canvas.height; row+=scale) {
//     for(let col=0; col<canvas.width; col+=scale) {
//       graphics.strokeRect(col-0.5, row-0.5, scale, scale);
//     }
//   }
// }
//
// function drawCourt(court) {
//   court.eachRow((row, rowIndex) => {
//     row.forEach((col, colIndex) => {
//       if(col) {
//         graphics.fillStyle = col;
//         graphics.fillRect(colIndex*scale, rowIndex*scale, scale, scale);
//       }
//     });
//   })
// }
//
// function drawPiece(piece, graphics) {
//   graphics.fillStyle = piece.color;
//   piece.eachRow((row, rowIndex) => {
//     row.forEach((col, colIndex) => {
//       if(col) {
//         graphics.fillRect(
//           (colIndex+piece.x)*scale,
//           (rowIndex+piece.y)*scale,
//           scale, scale);
//       }
//     });
//   });
// }
//
// setInterval(function () {
//   tick();
//   // piece.debug();
//   // piece.rotate();
//   // if(piece.rotationIndex % 4 === 0) {
//   //   piece = pieces.next();
//   //   console.log(`Next piece: ${piece.label}`);
//   // }
// }, 500);
// tick();

import Game from './data/game';
import Graphics from './graphics';

// Initialize Canvas
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const game = new Game();
const graphics = new Graphics(game, canvas);

// 1 block = 10px by default.
// Scale up (20px per block);
graphics.setScale(2);

window.game = game;
window.graphics = graphics;

function tick() {
  game.update();
  graphics.draw();
}

function start() {
  window.interval = setInterval(tick, 500);
  tick();
}

start();

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
  } else if (event.which === 32) {
    game.drop();
    graphics.draw();
  } else if(event.which === 27) {
    if(window.interval) {
      window.clearInterval(window.interval);
      window.interval = false;
    } else {
      start();
    }
  } else {
    console.log(event.which);
  }
});

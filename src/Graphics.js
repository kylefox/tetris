export default class Graphics {

  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.initialScale = 10;
    this.setScale(1);
    this.graphics = this.canvas.getContext('2d');
  }

  setScale(factor) {
    this.scale = this.initialScale * factor;
    this.canvas.width = this.game.court.width * this.scale;
    this.canvas.height = this.game.court.height * this.scale;
  }

  draw() {
    this.graphics.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawFrame();
    if(this.game.isRunning()) {
      this.drawCurrentPiece();
      this.drawCourt();
    } else if(this.game.isPaused()) {
      this.drawPaused();
    }
  }

  drawFrame() {
    this.graphics.lineWidth = 1;
    this.graphics.strokeStyle = '#9aa7ad';
    this.graphics.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawPaused() {
    this.graphics.fillStyle = '#f8f9f9';
    this.graphics.fillRect(1, 1, this.canvas.width-2, this.canvas.height-2);
    this.graphics.fillStyle = '#bfc8cb';
    this.graphics.font = `${this.scale}px monospace`;
    this.graphics.textAlign = 'center';
    this.graphics.fillText("PAUSED", this.canvas.width/2, this.canvas.height/2);
  }

  drawCourt() {
    this.graphics.lineWidth = 0.5;
    this.graphics.strokeStyle = '#e5e8ea';
    this.game.court.eachRow((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if(col) {
          this.graphics.fillStyle = col;
          this.graphics.fillRect(colIndex * this.scale, rowIndex * this.scale, this.scale, this.scale);
        }
        this.graphics.strokeRect((colIndex * this.scale) - 0.5, (rowIndex * this.scale) -0.5, this.scale, this.scale);
      });
    })
  }

  drawCurrentPiece() {
    this.graphics.fillStyle = this.game.currentPiece.color;
    this.game.currentPiece.eachRow((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if(col) {
          this.graphics.fillStyle = this.game.currentPiece.color;
          this.graphics.fillRect(
            (colIndex+this.game.currentPiece.x) * this.scale,
            (rowIndex+this.game.currentPiece.y) * this.scale,
            this.scale, this.scale);
        } else {
          this.graphics.fillStyle = "#fff000";
          this.graphics.fillRect(
            (colIndex+this.game.currentPiece.x) * this.scale,
            (rowIndex+this.game.currentPiece.y) * this.scale,
            this.scale, this.scale);
        }
      });
    });
  }

}

export default class Graphics {

  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.scale = 15;
    this.graphics = this.canvas.getContext('2d');
    this.canvas.width = this.game.court.width * this.scale;
    this.canvas.height = this.game.court.height * this.scale;
  }

  draw() {
    this.graphics.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawCurrentPiece();
    this.drawCourt();
  }

  drawCourt() {
    this.graphics.lineWidth = 1;
    this.graphics.strokeStyle = '#999';
    this.graphics.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    this.graphics.lineWidth = 0.5;
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
          this.graphics.fillRect(
            (colIndex+this.game.currentPiece.x) * this.scale,
            (rowIndex+this.game.currentPiece.y) * this.scale,
            this.scale, this.scale);
        }
      });
    });
  }

}
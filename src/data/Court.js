export default class Court {

  constructor(params) {
    params = params || {};
    this.width = params.width || 10;
    this.height = params.height || 20;
    this.cells = [];
  }

  freeze(piece) {
    piece.eachRow((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if(col) {
          this.cells[
            ( colIndex + piece.x ) +                  // X component
            ( ( piece.y + rowIndex ) * this.width )   // Y component
          ] = piece.color;
        }
      });
    })
  }

  cellIndexForPoint(x, y) {
    if(x >= this.width || y >= this.height || x < 0 || y < 0) {
      throw new Error(`Point (${x}, ${y}) is out of bounds (${this.width}, ${this.height}).`);
    }
    return (x % this.width) + (y * this.width);
  }

  occupied(x, y) {
    return this.cells[this.cellIndexForPoint(x, y)];
  }

  rows() {
		let rows = []
		let row = [];
    for(let y=0; y<this.height; y++) {
      for(let x=0; x<this.width; x++) {
        // row[x] = this.occupied(x, y) ? 1 : 0;
        row[x] = this.cells[this.cellIndexForPoint(x, y)];
      }
      rows.push(row);
      row = [];
    }
		return rows;
	}

  eachRow(fn) {
    return this.rows().forEach(fn);
  }

  debug() {
    var output = '';
    this.eachRow((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        output += col ? '██' : '░░';
      })
      output += '\n';
    });
    console.log(output);
  }

}

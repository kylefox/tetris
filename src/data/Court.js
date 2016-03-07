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

  clearFullRows() {
    this.eachRow((row, rowIndex) => {
      // If the number of cells in the row which have a value
      // is equal to the width of the court, then the row is full and should be cleared.
      if(row.filter((cell) => cell !== undefined).length === this.width) {

        // Remove the filled row (rowIndex*this.width because our cells are single-dimension array).
        this.cells.splice(rowIndex*this.width, this.width);

        // Inject a row of undefined cells at the top of the court.
        Array.prototype.splice.apply(this.cells, [0,0].concat(new Array(this.width)));
      }
    });
  }

  cellIndexForPoint(x, y) {
    if(!this.pointInBounds(x, y)) {
      throw new Error(`Point (${x}, ${y}) is out of bounds (${this.width}, ${this.height}).`);
    }
    return (x % this.width) + (y * this.width);
  }

  occupied(x, y) {
    return this.cells[this.cellIndexForPoint(x, y)];
  }

  cellAvailable(x, y) {
    return this.pointInBounds(x, y) && !this.occupied(x, y);
  }

  pointInBounds(x, y) {
    return !(x >= this.width || y >= this.height || x < 0 || y < 0);
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

  allowMoveLeft(piece) {
    const columns = piece.columns();
    const numColumns = columns.length;
    for(let columnIndex=0; columnIndex<numColumns; columnIndex++) {
      const rows = columns[columnIndex];
      const numRows = rows.length;
      for(let rowIndex=0; rowIndex<numRows; rowIndex++) {
        if(rows[rowIndex]) {
          // There's a block in this cell. Check to see if the court is empty in the next slot left;
          if(!this.cellAvailable(piece.x+columnIndex-1, piece.y+rowIndex)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  allowMoveRight(piece) {
    const columns = piece.columns();
    for(let columnIndex=columns.length-1; columnIndex>0; columnIndex--) {
      const rows = columns[columnIndex];
      const numRows = rows.length;
      for(let rowIndex=0; rowIndex<numRows; rowIndex++) {
        if(rows[rowIndex]) {
          // There's a block in this cell. Check to see if the court is empty in the next slot left;
          if(!this.cellAvailable(piece.x+columnIndex+1, piece.y+rowIndex)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  allowRotation(piece) {
    // Get next rotation and check if any of the piece blocks intersect with an occupied court cell.
    let allowRotation = true;
    const rotated = piece.clone();
    rotated.rotate();
    rotated.eachRow((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if(column && !this.cellAvailable(rotated.x+columnIndex, rotated.y+rowIndex)) {
          allowRotation = false;
        }
      });
    });
    return allowRotation;
  }

}

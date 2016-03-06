const I = {
	label: 'I',
	color: 'green',
	rotations: [
	  [0,1,0,0,
	   0,1,0,0,
	   0,1,0,0,
	   0,1,0,0],

	  [0,0,0,0,
	   1,1,1,1,
	   0,0,0,0,
	   0,0,0,0],

	  [0,0,1,0,
	   0,0,1,0,
	   0,0,1,0,
	   0,0,1,0],

	  [0,0,0,0,
	   0,0,0,0,
	   1,1,1,1,
	   0,0,0,0],
	]
};

const J = {
	label: 'J',
	color: 'red',
	rotations: [
	  [0,1,0,0,
	   0,1,0,0,
	   1,1,0,0,
	   0,0,0,0],

	  [1,0,0,0,
	   1,1,1,0,
	   0,0,0,0,
	   0,0,0,0],

	  [0,1,1,0,
	   0,1,0,0,
	   0,1,0,0,
	   0,0,0,0],

	  [0,0,0,0,
	   1,1,1,0,
	   0,0,1,0,
	   0,0,0,0],
	]
};

const L = {
	label: 'L',
	color: 'blue',
	rotations: [
	  [0,1,0,0,
	   0,1,0,0,
	   0,1,1,0,
	   0,0,0,0],

	  [0,0,0,0,
	   1,1,1,0,
	   1,0,0,0,
	   0,0,0,0],

	  [1,1,0,0,
	   0,1,0,0,
	   0,1,0,0,
	   0,0,0,0],

	  [0,0,1,0,
	   1,1,1,0,
	   0,0,0,0,
	   0,0,0,0],
	]
};

const T = {
	label: 'T',
	color: 'pink',
	rotations: [
	  [0,0,0,0,
	   1,1,1,0,
	   0,1,0,0,
	   0,0,0,0],

	  [0,1,0,0,
	   1,1,0,0,
	   0,1,0,0,
	   0,0,0,0],

	  [0,1,0,0,
	   1,1,1,0,
	   0,0,0,0,
	   0,0,0,0],

	  [0,1,0,0,
	   0,1,1,0,
	   0,1,0,0,
	   0,0,0,0],
	]
};

const O = {
	label: 'O',
	color: 'purple',
	rotations: [
	  [1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
		[1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
		[1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
		[1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
	]
};

const S = {
	label: 'S',
	color: 'brown',
	rotations: [
	  [0,0,0,0,
	   0,1,1,0,
	   1,1,0,0,
	   0,0,0,0],

		[1,0,0,0,
		 1,1,0,0,
		 0,1,0,0,
		 0,0,0,0],

		[0,1,1,0,
		 1,1,0,0,
		 0,0,0,0,
		 0,0,0,0],

		[0,1,0,0,
		 0,1,1,0,
		 0,0,1,0,
		 0,0,0,0],
	]
};

const Z = {
	label: 'Z',
	color: 'cyan',
	rotations: [
	  [0,0,0,0,
	   1,1,0,0,
	   0,1,1,0,
	   0,0,0,0],

		[0,1,0,0,
		 1,1,0,0,
		 1,0,0,0,
		 0,0,0,0],

		[1,1,0,0,
		 0,1,1,0,
		 0,0,0,0,
		 0,0,0,0],

		[0,0,1,0,
		 0,1,1,0,
		 0,1,0,0,
		 0,0,0,0],
	]
};

class Piece {

	constructor(data) {
		this.label = data.label;
		this.color = data.color;
		this.rotations = data.rotations;
		this.rotationIndex = 0;
		this.y = 0;
		this.x = 0;
	}

	clone() {
		let clone = new Piece({
			label: this.label,
			color: this.color,
			rotations: this.rotations,
		});
		clone.x = this.x;
		clone.y = this.y;
		clone.rotationIndex = this.rotationIndex;
		return clone;
	}

	rotationAtIndex(index) {
		return this.rotations[index % this.rotations.length];
	}

	rotation() {
		return this.rotationAtIndex(this.rotationIndex);
	}

	nextRotation() {
		return this.rotationAtIndex(this.rotationIndex+1);
	}

	rotate() {
		this.rotationIndex++;
		return this.rotation();
	}

	rows() {
		let rows = []
		let row = [];
		this.rotation().forEach(function(block, index) {
			row.push(block);
			if(index % 4 === 3) {
				rows.push(row);
				row = [];
			}
		});
		return rows;
	}

	columns() {
		let columns = [[], [], [], [],];
		this.eachRow((row, rowIndex) => {
			columns[0].push(row[0]);
			columns[1].push(row[1]);
			columns[2].push(row[2]);
			columns[3].push(row[3]);
		});
		return columns;
	}

	eachRow(fn) {
		return this.rows().forEach(fn);
	}

	eachColumn(fn) {
		return this.columns().forEach(fn);
	}

	// TODO
	eachCell(fn) {
		// yield each cell x,y (starting at 0,0) and the cell value (0 or 1)
		// Also allow an "absolute" (boolean) flag
		// fn(x, y, value);
	}

	debug() {
		let output = "";
		this.eachRow(function(row, rowIndex) {
			row.forEach((col, colIndex) => {
				output += col === 1 ? '██' : '░░';
			})
			output += '\n';
		});
		console.log(output);
	}
}


export default class Pieces {

	constructor() {
		this.reset();
	}

	reset() {
		this.queue = [I, J, L, T, O, S, Z];
	}

	next() {
		if(this.queue.length === 0) {
			this.reset();
		}
		const data = this.queue.splice(Math.floor(Math.random() * this.queue.length), 1)[0];
		return new Piece(data);
	}

}

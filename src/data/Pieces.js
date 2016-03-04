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
	color: 'yellow',
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

	rotation() {
		return this.rotations[this.rotationIndex % this.rotations.length];
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

	eachRow(fn) {
		return this.rows().forEach(fn);
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

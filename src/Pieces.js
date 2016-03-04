const I = {
	label: 'I',
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
	rotations: [
	  [1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
		[1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
		[1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
		[1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
	]
};

const S = {
	label: 'S',
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
		this.rotations = data.rotations;
		this.rotationIndex = 0;
	}

	rotation() {
		return this.rotations[this.rotationIndex % this.rotations.length];
	}

	rotate() {
		this.rotationIndex++;
		return this.rotation();
	}

	debug() {
		let output = "";
		this.rotation().forEach(function(block, index) {
			output += block === 1 ? '██' : '░░';
			if(index % 4 === 3) {
				output += '\n';
			}
		})
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

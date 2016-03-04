(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Court = (function () {
  function Court(params) {
    _classCallCheck(this, Court);

    params = params || {};
    this.width = params.width || 10;
    this.height = params.height || 20;
    this.cells = [];
  }

  _createClass(Court, [{
    key: 'freeze',
    value: function freeze(piece) {
      var _this = this;

      piece.eachRow(function (row, rowIndex) {
        row.forEach(function (col, colIndex) {
          if (col) {
            _this.cells[colIndex + piece.x + // X component
            (piece.y + rowIndex) * _this.width // Y component
            ] = piece.color;
          }
        });
      });
    }
  }, {
    key: 'cellIndexForPoint',
    value: function cellIndexForPoint(x, y) {
      if (x >= this.width || y >= this.height || x < 0 || y < 0) {
        throw new Error('Point (' + x + ', ' + y + ') is out of bounds (' + this.width + ', ' + this.height + ').');
      }
      return x % this.width + y * this.width;
    }
  }, {
    key: 'occupied',
    value: function occupied(x, y) {
      return this.cells[this.cellIndexForPoint(x, y)];
    }
  }, {
    key: 'rows',
    value: function rows() {
      var rows = [];
      var row = [];
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          // row[x] = this.occupied(x, y) ? 1 : 0;
          row[x] = this.cells[this.cellIndexForPoint(x, y)];
        }
        rows.push(row);
        row = [];
      }
      return rows;
    }
  }, {
    key: 'eachRow',
    value: function eachRow(fn) {
      return this.rows().forEach(fn);
    }
  }, {
    key: 'debug',
    value: function debug() {
      var output = '';
      this.eachRow(function (row, rowIndex) {
        row.forEach(function (col, colIndex) {
          output += col ? '██' : '░░';
        });
        output += '\n';
      });
      console.log(output);
    }
  }]);

  return Court;
})();

exports['default'] = Court;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var I = {
	label: 'I',
	color: 'green',
	rotations: [[0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0]]
};

var J = {
	label: 'J',
	color: 'red',
	rotations: [[0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0]]
};

var L = {
	label: 'L',
	color: 'blue',
	rotations: [[0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
};

var T = {
	label: 'T',
	color: 'yellow',
	rotations: [[0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0]]
};

var O = {
	label: 'O',
	color: 'purple',
	rotations: [[1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
};

var S = {
	label: 'S',
	color: 'brown',
	rotations: [[0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0]]
};

var Z = {
	label: 'Z',
	color: 'cyan',
	rotations: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0]]
};

var Piece = (function () {
	function Piece(data) {
		_classCallCheck(this, Piece);

		this.label = data.label;
		this.color = data.color;
		this.rotations = data.rotations;
		this.rotationIndex = 0;
		this.y = 0;
		this.x = 0;
	}

	_createClass(Piece, [{
		key: 'rotation',
		value: function rotation() {
			return this.rotations[this.rotationIndex % this.rotations.length];
		}

		// TODO: It would simplify things if this method returned an array of Point objects
		// each with an x and y coordinate. That would save us from doing modulo math everywhere.
		// or maybe we have an .eachRow() method than yields ex: [0, 0, 1, 0]
	}, {
		key: 'rotate',
		value: function rotate() {
			this.rotationIndex++;
			return this.rotation();
		}
	}, {
		key: 'rows',
		value: function rows() {
			var rows = [];
			var row = [];
			this.rotation().forEach(function (block, index) {
				row.push(block);
				if (index % 4 === 3) {
					rows.push(row);
					row = [];
				}
			});
			return rows;
		}
	}, {
		key: 'eachRow',
		value: function eachRow(fn) {
			return this.rows().forEach(fn);
		}
	}, {
		key: 'debug',
		value: function debug() {
			var output = "";
			this.eachRow(function (row, rowIndex) {
				row.forEach(function (col, colIndex) {
					output += col === 1 ? '██' : '░░';
				});
				output += '\n';
			});
			console.log(output);
		}
	}]);

	return Piece;
})();

var Pieces = (function () {
	function Pieces() {
		_classCallCheck(this, Pieces);

		this.reset();
	}

	_createClass(Pieces, [{
		key: 'reset',
		value: function reset() {
			this.queue = [I, J, L, T, O, S, Z];
		}
	}, {
		key: 'next',
		value: function next() {
			if (this.queue.length === 0) {
				this.reset();
			}
			var data = this.queue.splice(Math.floor(Math.random() * this.queue.length), 1)[0];
			return new Piece(data);
		}
	}]);

	return Pieces;
})();

exports['default'] = Pieces;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dataPieces = require('./data/pieces');

var _dataPieces2 = _interopRequireDefault(_dataPieces);

var _dataCourt = require('./data/court');

var _dataCourt2 = _interopRequireDefault(_dataCourt);

var court = new _dataCourt2['default']();
var pieces = new _dataPieces2['default']();
var canvas = document.createElement('canvas');
var graphics = canvas.getContext('2d');
var scale = 15;

canvas.width = court.width * scale;
canvas.height = court.height * scale;
document.body.appendChild(canvas);

var piece = pieces.next();

piece.y = 100;
court.freeze(piece);
// court.debug();
piece = pieces.next();
// court.freeze(piece);
// court.debug();

function tick() {
  graphics.clearRect(0, 0, canvas.width, canvas.height);

  drawCourt(court);
  drawPiece(piece, graphics);

  piece.y += 1;
  // piece.x += 1;
  // piece.rotate();

  if (piece.y * scale > 150) {
    court.freeze(piece);
    piece = pieces.next();
  }

  graphics.strokeStyle = '#bbb';
  graphics.lineWidth = 1;
  graphics.strokeRect(0, 0, canvas.width, canvas.height);
  graphics.lineWidth = 0.5;
  for (var row = 0; row < canvas.height; row += scale) {
    for (var col = 0; col < canvas.width; col += scale) {
      graphics.strokeRect(col - 0.5, row - 0.5, scale, scale);
    }
  }
}

function drawCourt(court) {
  court.eachRow(function (row, rowIndex) {
    row.forEach(function (col, colIndex) {
      if (col) {
        graphics.fillStyle = col;
        graphics.fillRect(colIndex * scale, rowIndex * scale, scale, scale);
      }
    });
  });
}

function drawPiece(piece, graphics) {
  graphics.fillStyle = piece.color;
  piece.eachRow(function (row, rowIndex) {
    row.forEach(function (col, colIndex) {
      if (col) {
        graphics.fillRect((colIndex + piece.x) * scale, (rowIndex + piece.y) * scale, scale, scale);
      }
    });
  });
}

setInterval(function () {
  tick();
  // piece.debug();
  // piece.rotate();
  // if(piece.rotationIndex % 4 === 0) {
  //   piece = pieces.next();
  //   console.log(`Next piece: ${piece.label}`);
  // }
}, 500);
tick();

},{"./data/court":1,"./data/pieces":2}]},{},[3]);

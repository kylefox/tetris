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
      if (!this.pointInBounds(x, y)) {
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
    key: 'cellAvailable',
    value: function cellAvailable(x, y) {
      return this.pointInBounds(x, y) && !this.occupied(x, y);
    }
  }, {
    key: 'pointInBounds',
    value: function pointInBounds(x, y) {
      return !(x >= this.width || y >= this.height || x < 0 || y < 0);
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _pieces = require('./pieces');

var _pieces2 = _interopRequireDefault(_pieces);

var _court = require('./court');

var _court2 = _interopRequireDefault(_court);

var Game = (function () {
  function Game() {
    _classCallCheck(this, Game);

    this.reset();
  }

  _createClass(Game, [{
    key: 'reset',
    value: function reset() {
      this.court = new _court2['default']();
      this.pieces = new _pieces2['default']();
      this.currentPiece = this.pieces.next();
    }
  }, {
    key: 'update',
    value: function update() {
      // If the next Y increment will collide, freeze the piece and generate a new one.
      if (this.willVerticallyCollide()) {
        this.court.freeze(this.currentPiece);
        this.currentPiece = this.pieces.next();
      } else {
        this.currentPiece.y += 1;
      }
    }
  }, {
    key: 'moveRight',
    value: function moveRight() {
      var columns = this.currentPiece.columns();
      for (var columnIndex = columns.length - 1; columnIndex > 0; columnIndex--) {
        var rows = columns[columnIndex];
        var numRows = rows.length;
        for (var rowIndex = 0; rowIndex < numRows; rowIndex++) {
          if (rows[rowIndex]) {
            // There's a block in this cell. Check to see if the court is empty in the next slot left;
            if (!this.court.cellAvailable(this.currentPiece.x + columnIndex + 1, this.currentPiece.y + rowIndex)) {
              return false;
            }
          }
        }
      }
      this.currentPiece.x++;
      return true;
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft() {
      var columns = this.currentPiece.columns();
      var numColumns = columns.length;
      for (var columnIndex = 0; columnIndex < numColumns; columnIndex++) {
        var rows = columns[columnIndex];
        var numRows = rows.length;
        for (var rowIndex = 0; rowIndex < numRows; rowIndex++) {
          if (rows[rowIndex]) {
            // There's a block in this cell. Check to see if the court is empty in the next slot left;
            if (!this.court.cellAvailable(this.currentPiece.x + columnIndex - 1, this.currentPiece.y + rowIndex)) {
              return false;
            }
          }
        }
      }
      this.currentPiece.x--;
      return true;
    }
  }, {
    key: 'willVerticallyCollide',
    value: function willVerticallyCollide() {
      // TODO: Do we actually need to re-check this every update? *the court is static.*
      // Once a piece is frozen we can calculate the highest point in each column in the court.
      // Would be an array where index are column indexes and elements are the highest cell (y value) that has a block (or undefined if no blocks in that column).

      // Iterate from bottom up, ex: check lower rows first.
      var rows = this.currentPiece.rows();
      for (var rowIndex = rows.length - 1; rowIndex >= 0; rowIndex--) {
        // TODO: skip completely empty rows and columns.
        var columns = rows[rowIndex];
        var numColumns = columns.length;
        for (var columnIndex = 0; columnIndex < numColumns; columnIndex++) {
          if (columns[columnIndex]) {
            // There's a block in this cell. Check to see if the court is empty in the next slot down.
            if (!this.court.cellAvailable(this.currentPiece.x + columnIndex, this.currentPiece.y + rowIndex + 1)) {
              return true;
            }
          }
        }
      }
      return false;
    }
  }]);

  return Game;
})();

exports['default'] = Game;
module.exports = exports['default'];

},{"./court":1,"./pieces":3}],3:[function(require,module,exports){
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
	color: 'pink',
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
		key: 'columns',
		value: function columns() {
			var columns = [[], [], [], []];
			this.eachRow(function (row, rowIndex) {
				columns[0].push(row[0]);
				columns[1].push(row[1]);
				columns[2].push(row[2]);
				columns[3].push(row[3]);
			});
			return columns;
		}
	}, {
		key: 'eachRow',
		value: function eachRow(fn) {
			return this.rows().forEach(fn);
		}
	}, {
		key: 'eachColumn',
		value: function eachColumn(fn) {
			return this.columns().forEach(fn);
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Graphics = (function () {
  function Graphics(game, canvas) {
    _classCallCheck(this, Graphics);

    this.game = game;
    this.canvas = canvas;
    this.scale = 15;
    this.graphics = this.canvas.getContext('2d');
    this.canvas.width = this.game.court.width * this.scale;
    this.canvas.height = this.game.court.height * this.scale;
  }

  _createClass(Graphics, [{
    key: 'draw',
    value: function draw() {
      this.graphics.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawCurrentPiece();
      this.drawCourt();
    }
  }, {
    key: 'drawCourt',
    value: function drawCourt() {
      var _this = this;

      this.graphics.lineWidth = 1;
      this.graphics.strokeStyle = '#999';
      this.graphics.strokeRect(0, 0, this.canvas.width, this.canvas.height);
      this.graphics.lineWidth = 0.5;
      this.game.court.eachRow(function (row, rowIndex) {
        row.forEach(function (col, colIndex) {
          if (col) {
            _this.graphics.fillStyle = col;
            _this.graphics.fillRect(colIndex * _this.scale, rowIndex * _this.scale, _this.scale, _this.scale);
          }
          _this.graphics.strokeRect(colIndex * _this.scale - 0.5, rowIndex * _this.scale - 0.5, _this.scale, _this.scale);
        });
      });
    }
  }, {
    key: 'drawCurrentPiece',
    value: function drawCurrentPiece() {
      var _this2 = this;

      this.graphics.fillStyle = this.game.currentPiece.color;
      this.game.currentPiece.eachRow(function (row, rowIndex) {
        row.forEach(function (col, colIndex) {
          if (col) {
            _this2.graphics.fillStyle = _this2.game.currentPiece.color;
            _this2.graphics.fillRect((colIndex + _this2.game.currentPiece.x) * _this2.scale, (rowIndex + _this2.game.currentPiece.y) * _this2.scale, _this2.scale, _this2.scale);
          } else {
            _this2.graphics.fillStyle = "#ffffcc";
            _this2.graphics.fillRect((colIndex + _this2.game.currentPiece.x) * _this2.scale, (rowIndex + _this2.game.currentPiece.y) * _this2.scale, _this2.scale, _this2.scale);
          }
        });
      });
    }
  }]);

  return Graphics;
})();

exports['default'] = Graphics;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dataGame = require('./data/game');

var _dataGame2 = _interopRequireDefault(_dataGame);

var _graphics = require('./graphics');

var _graphics2 = _interopRequireDefault(_graphics);

// Initialize Canvas
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

var game = new _dataGame2['default']();
var graphics = new _graphics2['default'](game, canvas);

function tick() {
  game.update();
  graphics.draw();
}

setInterval(tick, 100);
tick();

window.addEventListener('keydown', function (event) {
  if (event.which === 39) {
    game.moveRight();
    graphics.draw();
  } else if (event.which === 37) {
    game.moveLeft();
    graphics.draw();
  } else if (event.which === 38) {
    game.currentPiece.rotate();
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

},{"./data/game":2,"./graphics":4}]},{},[5]);

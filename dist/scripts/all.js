(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _pieces = require('./pieces');

var _pieces2 = _interopRequireDefault(_pieces);

var pieces = new _pieces2['default']();

var piece = pieces.next();

setInterval(function () {
  piece.debug();
  piece.rotate();
  if (piece.rotationIndex % 4 === 0) {
    piece = pieces.next();
    console.log('Next piece: ' + piece.label);
  }
}, 1000);

},{"./pieces":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var I = {
	label: 'I',
	rotations: [[0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0]]
};

var J = {
	label: 'J',
	rotations: [[0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0]]
};

var L = {
	label: 'L',
	rotations: [[0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
};

var T = {
	label: 'T',
	rotations: [[0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0]]
};

var O = {
	label: 'O',
	rotations: [[1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
};

var S = {
	label: 'S',
	rotations: [[0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0]]
};

var Z = {
	label: 'Z',
	rotations: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0]]
};

var Piece = (function () {
	function Piece(data) {
		_classCallCheck(this, Piece);

		this.label = data.label;
		this.rotations = data.rotations;
		this.rotationIndex = 0;
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
		key: 'debug',
		value: function debug() {
			var output = "";
			this.rotation().forEach(function (block, index) {
				output += block === 1 ? '██' : '░░';
				if (index % 4 === 3) {
					output += '\n';
				}
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

},{}]},{},[1]);

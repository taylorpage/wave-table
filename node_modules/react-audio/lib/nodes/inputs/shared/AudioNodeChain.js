'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AudioNodeChain = function () {
	function AudioNodeChain() {
		_classCallCheck(this, AudioNodeChain);

		this.chain = [];
		this.hasSource = false;
		this.hasDestination = false;
	}

	_createClass(AudioNodeChain, [{
		key: '_nodeExists',
		value: function _nodeExists(node, method) {
			if (!node) throw new Error('Nodes must be provided to ' + method);
		}
	}, {
		key: 'source',
		value: function source() {
			if (!this.hasSource) return null;

			return this.chain[0];
		}
	}, {
		key: 'destination',
		value: function destination() {
			if (!this.hasDestination) return null;

			return this.chain[this.chain.length];
		}
	}, {
		key: 'setSource',
		value: function setSource(node) {
			this._nodeExists(node, 'setSource');

			if (this.hasSource) throw new Error('Only one source allowed per AudioNodeChain');

			this.unshift(node);
			this.hasSource = true;
		}
	}, {
		key: 'setDestination',
		value: function setDestination(node) {
			this._nodeExists(node, 'setDestination');

			if (this.hasDestination) throw new Error('Only one destination allowed per AudioNodeChain');

			this.push(node);
			this.hasSource = true;
		}
	}, {
		key: 'first',
		value: function first() {
			var index;

			if (this.hasSource) index = 1;
			index = 0;

			return this.chain[index];
		}
	}, {
		key: 'last',
		value: function last() {
			var index;

			if (this.hasDestination) index = this.chain.length - 2;
			index = this.chain.length - 1;

			return this.chain[index];
		}
	}, {
		key: 'push',
		value: function push(node) {
			this._nodeExists(node, 'push');

			var last = this.last();
			if (last) last.connect(node);
			return this.chain.push(node);
		}
	}, {
		key: 'pop',
		value: function pop() {
			var node = this.chain.pop();
			if (node) node.disconnect();
			return node;
		}
	}, {
		key: 'shift',
		value: function shift() {
			var node = this.chain.shift();
			if (node) node.disconnect();
			return node;
		}
	}, {
		key: 'unshift',
		value: function unshift(node) {
			this._nodeExists(node, 'unshift');

			var first = this.first();
			var source = this.source();

			if (source) {
				source.disconnect();
				source.connect(node);
			}
			if (first) node.connect(first);

			return this.chain.unshift(node);
		}
	}, {
		key: '_insert',
		value: function _insert(node, position) {
			var max = this.chain.length;
			if (this.hasSource) position++;
			if (this.hasDestination) max--;

			if (!Number.isInteger(position) || position < 0) throw new Error('Node can not be inserted in position ' + position);
			if (position > max) throw new Error('Node inserted at ' + position + ', which is above the maximum of ' + max);

			var previous = this.chain[position - 1];
			var next = this.chain[position];

			if (next) {
				next.disconnect(previous);
				node.connect(next);
			}
			if (previous) previous.connect(node);

			this.chain.splice(position, 0, node);
		}
	}, {
		key: 'move',
		value: function move(node, toIndex) {
			this.remove(node);
			this._insert(node, toIndex);
		}
	}, {
		key: '_moveByRelativePosition',
		value: function _moveByRelativePosition(node, delta) {
			var index = this._getNodeIndex(node);
			this._removeByIndex(index);
			this._insert(node, index + delta);
		}
	}, {
		key: 'moveUp',
		value: function moveUp(node) {
			this._moveByRelativePosition(node, -1);
		}
	}, {
		key: 'moveDown',
		value: function moveDown(node) {
			this._moveByRelativePosition(node, 1);
		}
	}, {
		key: '_removeByIndex',
		value: function _removeByIndex(index) {
			if (!this.chain[index]) throw new Error('No node at index ' + index);
			if (index == 0 && this.hasSource) this.hasSource = false;
			if (index == this.chain.length && this.hasDestination) this.hasDestination = false;

			var previous = this.chain[index - 1];
			var next = this.chain[index + 1];

			var _chain$splice = this.chain.splice(index, 1);

			var _chain$splice2 = _slicedToArray(_chain$splice, 1);

			var removed = _chain$splice2[0];

			removed.disconnect();

			if (previous && next) previous.connect(next);

			return removed;
		}
	}, {
		key: '_getNodeIndex',
		value: function _getNodeIndex(node) {
			var index = this.chain.findIndex(function (_node) {
				return _node === node;
			});
			if (index == -1) throw new Error('Node not found!');
			return index;
		}
	}, {
		key: '_removeByNode',
		value: function _removeByNode(node) {
			this._nodeExists(node, 'remove');

			var index = this._getNodeIndex(node);
			return this._removeByIndex(index);
		}
	}, {
		key: 'remove',
		value: function remove(arg) {
			if (typeof arg == 'number') return this._removeByIndex(arg);
			return this._removeByNode(arg);
		}
	}]);

	return AudioNodeChain;
}();

exports.default = AudioNodeChain;
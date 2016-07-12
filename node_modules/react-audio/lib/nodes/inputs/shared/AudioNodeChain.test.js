'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _AudioNodeChain = require('./AudioNodeChain');

var _AudioNodeChain2 = _interopRequireDefault(_AudioNodeChain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
	function Node(number) {
		_classCallCheck(this, Node);

		if (!Number.isInteger(number)) throw new Error('Node requires an integer parameter!');

		this.previous = null;
		this.next = null;
		this.number = number;
	}

	_createClass(Node, [{
		key: 'connect',
		value: function connect(nextNode) {
			if (this.next) throw new Error('Nodes can only be connected to one child at a time!');

			this.next = nextNode;
			nextNode.previous = this;
		}
	}, {
		key: 'disconnect',
		value: function disconnect(node) {
			if (!this.previous && !this.next) throw new Error('Can not disconnect when not connected');

			if (this.previous && (!node || this.previous == node)) {
				this.previous.next = null;
				this.previous = null;
			}if (this.next && (!node || this.next == node)) {
				this.next.previous = null;
				this.next = null;
			}
		}
	}]);

	return Node;
}();

var init = function init(count) {
	var audioNodeChain = new _AudioNodeChain2.default();
	for (var i = 0; i < count; i++) {
		audioNodeChain.push(new Node(i));
	}return audioNodeChain;
};

var checkChain = function checkChain(t, audioNodeChain, expected) {
	var chain = function chain(type) {
		var actual = [];
		var otherType = type == 'next' ? 'previous' : 'next';
		var node = audioNodeChain.chain[type == 'next' ? 0 : audioNodeChain.chain.length - 1];
		if (node) t.equal(node[otherType], null, 'Check start point');

		while (node) {
			actual[type == 'next' ? 'push' : 'unshift'](node.number);
			node = node[type];
		}

		if (node) t.equal(node[otherType], null, 'Check end point');

		return actual;
	};

	var array = audioNodeChain.chain.map(function (_ref) {
		var number = _ref.number;
		return number;
	});

	t.deepEqual(chain('next'), expected, 'Check next connections');
	t.deepEqual(chain('previous'), expected, 'Check previous connections');
	t.deepEqual(array, expected, 'Check chain');
};

(0, _tape2.default)('Can connect nodes', function (t) {
	var one = new Node(1);
	var two = new Node(2);

	t.equal(one.number, 1);
	t.equal(two.number, 2);

	t.equal(one.next, null);
	one.connect(two);

	t.equal(one.next, two);
	t.equal(two.previous, one);

	t.end();
});

(0, _tape2.default)('Can get the first and last last nodes', function (t) {
	var audioNodeChain = new _AudioNodeChain2.default();
	var first = new Node(0);
	var last = new Node(1);

	audioNodeChain.chain = [first, last];
	t.equal(audioNodeChain.first(), first);
	t.equal(audioNodeChain.last(), last);

	t.end();
});

(0, _tape2.default)('Can initialize a node chain', function (t) {
	var count = 3;
	var audioNodeChain = init(count);
	checkChain(t, audioNodeChain, [0, 1, 2]);

	t.end();
});

(0, _tape2.default)('Can insert nodes', function (t) {
	var count = 5;
	var audioNodeChain = init(count);
	var node = new Node(99);
	audioNodeChain._insert(node, 2);

	var expected = [0, 1, 99, 2, 3, 4];
	checkChain(t, audioNodeChain, expected);
	t.end();
});

(0, _tape2.default)('Can remove nodes by position', function (t) {
	var count = 5;
	var audioNodeChain = init(count);
	var node = audioNodeChain.remove(2);

	var expected = [0, 1, 3, 4];
	checkChain(t, audioNodeChain, expected);
	t.equal(node.number, 2);
	t.end();
});

(0, _tape2.default)('Can remove nodes by reference', function (t) {
	var count = 5;
	var index = 2;
	var audioNodeChain = init(count);
	var node = audioNodeChain.chain[index];
	var _node = audioNodeChain.remove(node);

	var expected = [0, 1, 3, 4];
	checkChain(t, audioNodeChain, expected);
	t.equal(node, _node);
	t.equal(node.number, index);
	t.end();
});

(0, _tape2.default)('Can move nodes', function (t) {
	var count = 5;
	var audioNodeChain = init(count);
	var chain = audioNodeChain.chain;

	var zero = chain[0];
	audioNodeChain.move(zero, chain.length - 1);

	var expected = [1, 2, 3, 4, 0];
	checkChain(t, audioNodeChain, expected);
	t.end();
});

(0, _tape2.default)('Can move nodes up', function (t) {
	var count = 5;
	var audioNodeChain = init(count);
	var chain = audioNodeChain.chain;

	var three = chain[3];
	audioNodeChain.moveUp(three);

	var expected = [0, 1, 3, 2, 4];
	checkChain(t, audioNodeChain, expected);
	t.end();
});

(0, _tape2.default)('Can move nodes down', function (t) {
	var count = 5;
	var audioNodeChain = init(count);
	var chain = audioNodeChain.chain;

	var two = chain[2];
	audioNodeChain.moveDown(two);

	var expected = [0, 1, 3, 2, 4];
	checkChain(t, audioNodeChain, expected);
	t.end();
});
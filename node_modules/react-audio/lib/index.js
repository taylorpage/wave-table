'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _AudioContext = require('./AudioContext');

var _AudioContext2 = _interopRequireDefault(_AudioContext);

var _nodes = require('./nodes');

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _extends({
	AudioContextComponent: _AudioContext2.default
}, _nodes2.default);
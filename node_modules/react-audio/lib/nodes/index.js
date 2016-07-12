'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _inputs = require('./inputs');

var _inputs2 = _interopRequireDefault(_inputs);

var _processors = require('./processors');

var _processors2 = _interopRequireDefault(_processors);

var _outputs = require('./outputs');

var _outputs2 = _interopRequireDefault(_outputs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodes = _extends({}, _inputs2.default, _processors2.default, _outputs2.default);

exports.default = nodes;
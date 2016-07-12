"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var node = this.node;
	var _props = this.props;
	var type = _props.type;
	var curve = _props.curve;
	var oversample = _props.oversample;
	var fftSize = _props.fftSize;
	var minDecibels = _props.minDecibels;
	var maxDecibels = _props.maxDecibels;
	var smoothingTimeConstant = _props.smoothingTimeConstant;

	var rest = _objectWithoutProperties(_props, ["type", "curve", "oversample", "fftSize", "minDecibels", "maxDecibels", "smoothingTimeConstant"]);

	if (!node) return;

	Object.assign(node, { type: type, curve: curve, oversample: oversample });

	for (var prop in rest) {
		if (node[prop]) node[prop].value = rest[prop];
	}
};

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
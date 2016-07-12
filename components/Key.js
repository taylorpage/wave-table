var React = require('react');
var Audio = require('./Audio');

var context = new window.AudioContext;
var osc;

var Key = React.createClass({

	_createOsc : function() {
    osc = context.createOscillator();
    osc.connect(context.destination);
    osc.frequency.value = this.props.freq;
    osc.start();
	},

	_stopOsc: function() {
		osc.stop();
	},

  render() {
  	return (
      <div className="key" onMouseDown={this._createOsc.bind(this)} onMouseUp={this._stopOsc.bind(this)}></div>
  	)
  }
});

module.exports = Key;
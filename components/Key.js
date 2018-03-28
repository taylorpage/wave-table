var React = require('react');
var Audio = require('./Audio');
var Counter = require('./counter')
var osc;

var Key = React.createClass({

	_createOsc : function() {
    osc = Audio.context.createOscillator();
    osc.connect(Audio.context.destination);
    osc.frequency.value = this.props.freq;
    osc.type = Audio.type;
    osc.start();
    Counter.count++;
	},

	_stopOsc: function() {
		osc.stop();
    Counter.count--;
	},

  render() {
  	return (
      <div
        className="key"
        onMouseDown={this._createOsc.bind(this)}
        onMouseUp={this._stopOsc.bind(this)}>
      </div>
  	)
  }
});

module.exports = Key;
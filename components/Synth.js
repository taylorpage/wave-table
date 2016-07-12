var React = require('react');

var Key = require('./Key');
var Volume = require('./Volume');

var Synth = React.createClass({
	_accFreqs1: [277.183,311.127],
	_accFreqs2: [369.994, 415.305, 466.164],
  _natFreqs: [261.626, 293.665, 329.628, 349.228, 391.995
, 440.000, 493.883, 523.251],

  render() {
  	return (
  		<div className="synth">
	      <h3>Synth</h3>
	      <div className="blacks">
		      <span>
			      { this._accFreqs1.map(frq => <Key freq={frq}/>) }
		      </span>
			      { this._accFreqs2.map(frq => <Key freq={frq}/>) }
	      </div>
	      <br />
	      <div className="whites">
		      { this._natFreqs.map(frq => <Key freq={frq}/>) }
	      </div>
      </div>
  	)
  }
});

module.exports = Synth;
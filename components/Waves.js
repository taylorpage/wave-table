var React = require('react');
var Audio = require('./Audio');


var Waves = React.createClass({
	_changeWave: function(type) {
    Audio.type = type;
	},

  render() {
  	return (
  		<div className="waveCont">
        <button onMouseDown={this._changeWave.bind(this, 'sine')} className='wave'>Sine</button>
        <button onClick={this._changeWave.bind(this, 'sawtooth')} className='wave'>Sawtooth</button>
        <button onClick={this._changeWave.bind(this, 'triangle')} className='wave'>Triangle</button>
        <button onClick={this._changeWave.bind(this, 'square')} className='wave'>Square</button>
	    </div>
  	)
  }
});

module.exports = Waves;
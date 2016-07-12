var React = require('react');

var Key = require('./Key');

var App = React.createClass({
  _natFreqs: [261.626, 293.665, 329.628, 349.228, 391.995
, 440.000, 493.883, 523.251],

  render() {
  	return (
  		<div>
	      <h1>APP</h1>
		      <div className="blacks">
			      <span>
				      <Key freq="277.183"/>
				      <Key freq="311.127"/>
			      </span>
			      <Key freq="369.994"/>
			      <Key freq="415.305"/>
			      <Key freq="466.164"/>
		      </div>
		    <br />
		      <div className="whites">
			      {
			      	this._natFreqs.map(frq => <Key freq={frq}/>)
			      }
		      </div>
    </div>
  	)
  }
});

module.exports = App;
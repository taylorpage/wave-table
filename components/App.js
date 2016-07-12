var React = require('react');

var Key = require('./Key');

var App = React.createClass({
	frequencies: [523.251, 554.365, 587.330, 622.254, 659.255, 698.456, 739.989, 783.991, 783.991, 830.609, 880.000, 932.328, 987.767],

  render() {
  	return (
  		<div>
      <h1>APP</h1>
      {
      	this.frequencies.map(frq => <Key freq={frq}/>)
      }
      </div>
  	)
  }
});

module.exports = App;
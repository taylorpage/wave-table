var React = require('react');
var Audio = require('react-audio');

var Key = React.createClass({
  osc: new Audio.Oscillator,
  render() {
  	return (
      <div>{console.log(this.osc)}</div>
  	)
  }
});

module.exports = Key;
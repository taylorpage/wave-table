var React = require('react');


var Meter = React.createClass({
  render() {
  	return (
  		<div className="meter">{ this.props.count } </div>
  	)
  }
});

module.exports = Meter;
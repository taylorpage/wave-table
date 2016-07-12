var React = require('react');

var Key = require('./Key');

var App = React.createClass({
  render() {
  	return (
  		<div>
      <h1>APP</h1>
      <Key />
      </div>
  	)
  }
});

module.exports = App;
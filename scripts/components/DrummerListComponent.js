/*
 *  Drummer List Component
 *
 *		React
 *		ReactDOM
 *
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var DrummerIconComponent = require('./DrummerIconComponent');

module.exports = React.createClass({
	render() {

		return (
			<div>
				<h1>Drummers Rule</h1>

				<DrummerIconComponent />
			</div>
		);
	}
});

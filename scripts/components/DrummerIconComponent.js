/*
 *  Drummer Icon Component
 *
 *		React
 *		ReactDOM
 *
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var DrummerModel = require('../models/DrummerModel');

module.exports = React.createClass({
	render() {
		var content = (this.props.content);

		return (
			<div className="icon-container">
				{content}
			</div>
		);
	}
});

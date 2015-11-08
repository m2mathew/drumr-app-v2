/*
 *  Drummer Icon Component
 *
 *		React
 * 		Drummer Model
 *
 */

'use strict';

var React = require('react');
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

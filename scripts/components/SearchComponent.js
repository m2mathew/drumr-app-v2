/*
 *  Search Component
 *
 *		React
 *		ReactDOM
 *
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

	render: function() {

		return (
			<div className="search-container">
				<input type="text" id="search-bar" placeholder="find a drummer" />
			</div>
		);
	}
});

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
				<form onSubmit={this.submitSearch}>
					<input type="text" id="search-bar" placeholder="find a drummer" />
					<button className="search-button">Search</button>
				</form>
			</div>
		);
	},
	submitSearch: function(e) {
		e.preventDefault();
		console.log('searching...');
		this.props.router.navigate('results', {trigger: true});
	}
});

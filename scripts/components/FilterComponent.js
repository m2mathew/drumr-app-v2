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
var Backbone = require('backbone');
var DrummerModel = require('../models/DrummerModel');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			drummers: []
		};
	},
	componentWillMount: function() {
		var query = new Parse.Query(DrummerModel);
		query
		.find().then(
			(drummer) => {
				this.setState({ drummers: drummer });
			},
			(err) => {
				console.log(err);
			}
		);

	},
	render: function() {

		return (
			<div className="search-container">
				<form onSubmit={this.submitSearch}>
					<input type="text"
							id="search-bar"
							ref="filterInput"
							placeholder="find a drummer"
							value={this.props.filterVal}
							onChange={this.constantSearch} />
					<button className="search-button">Search</button>
				</form>
			</div>
		);
	},
	constantSearch: function(e) {
		e.preventDefault();

		// grab value of the input as the user is typing in real time
		var searchForThis = this.refs.searchBar.value;
		var query = new Parse.Query(DrummerModel);
		query.startsWith("name", searchForThis);
		console.log('Searching as you type!');
	},
	submitSearch: function(e) {
		e.preventDefault();


		this.props.router.navigate('results', {trigger: true});
	}
});

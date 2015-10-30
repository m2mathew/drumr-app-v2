/*
 *  Filter Box Component
 *
 *		React
 *		ReactDOM
 *
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var FilterComponent = require('./FilterComponent');
var FilterResultsComponent = require('./FilterResultsComponent');
var DrummerModel = require('../models/DrummerModel');

module.exports = React.createClass({
	getInitialState() {
		return {
			drummers: [],
			filterText: ''
		};
	},
	componentWillMount() {
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
	stateUpdate(value) {
		this.setState( { filterText: value } );
	},
	render() {
		return (
			<div>
				<FilterComponent filterVal={this.state.filterText} filterUpdate={this.stateUpdate} />
				<FilterResultsComponent filter={this.state.filterText} drummers={this.state.drummers} />
			</div>
		);
	}
});

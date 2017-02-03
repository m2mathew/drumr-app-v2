/*
 *  Home Component
 *
 *		React
 *		Filter Component
 *		List Component
 *		Drummer Model
 *
 */

'use strict';

var React = require('react');
var FilterComponent = require('./FilterComponent');
var ListComponent = require('./ListComponent');
var DrummerModel = require('../models/DrummerModel');

module.exports = React.createClass({
	getInitialState() {
		return {
			drummers: [],
			filterText: ''
		};
	},
	componentWillMount() {
		// var query = new Parse.Query(DrummerModel);
		// query
		// .descending('numFav')
		// .limit(15)
		// .find().then(
		// 	(drummer) => {
		// 		this.setState({ drummers: drummer });
		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 	}
		// );
	},
	stateUpdate(value) {
		this.setState({ filterText: value });
	},
	render() {

		return (
			<div className="home-container">
				<div className="filter-container">
					<FilterComponent filterVal={this.state.filterText} filterUpdate={this.stateUpdate} />
				</div>

				<h1>Drummers Rule</h1>

				<ListComponent filter={this.state.filterText} drummers={this.state.drummers} />
			</div>
		);
	}
});

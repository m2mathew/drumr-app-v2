/*
 *  Filter Component
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
	render() {

		return (
			<div className="filter-container">
				<form onSubmit={this.submitSearch}>
					<input type="text"
							id="filter-input"
							ref="filterInput"
							placeholder="find a drummer"
							value={this.props.filterVal}
							onChange={this.filterTrigger} />
					<button className="search-button">Search</button>
				</form>
			</div>
		);
	},
	filterTrigger() {
		// run the stateUpdate method from the FilterBox component using the current value of the <input> field
		this.props.filterUpdate(this.refs.filterInput.value);
	}
});

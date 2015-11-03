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
var FilterComponent = require('./FilterComponent');
var DrummerModel = require('../models/DrummerModel');

module.exports = React.createClass({
	render() {

		return (
			<div className="filter-container">
				<form>
					<input type="text"
							id="filter-input"
							ref="filterInput"
							placeholder="enter a drummer name"
							value={this.props.filterVal}
							onChange={this.filterTrigger} />
				</form>
			</div>
		);
	},
	filterTrigger(e) {
		e.preventDefault();
		// run the stateUpdate method from the FilterBox component using the current value of the <input> field
		this.props.filterUpdate(this.refs.filterInput.value);
	}
});

/*
 *  Filter Results Component
 *
 *		React
 *		ReactDOM
 *
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	render() {
		if(this.props.drummers) {
			// this is grabbing the input correctly and converting it to lower case
			var input = this.props.filter.toLowerCase();

			var filteredContent = this.props.drummers.filter(function(drummer) {
				return (drummer.get('name').toLowerCase().indexOf(input) != -1);
			})
			.map(function(drummer) {
				return (
					<div className="icon-box" key={drummer.id}>
						{drummer.get('name')}
					</div>
				);
			});
		}

		return (
			<div>
				{filteredContent}
			</div>
		);
	}
});

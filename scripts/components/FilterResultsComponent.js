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
			console.log(input);

			var filteredContent = this.props.drummers.map(function(drummer, key) {
				if(drummer.get('name').toLowerCase().indexOf(input)) {
					return;
				}
				else {
					return (
					<div className="icon-box" key={key}>
						{drummer.get('name')}
					</div>
					);
				}
			});
		}

		return (
			<div>
				{filteredContent}
			</div>
		);
	}
});

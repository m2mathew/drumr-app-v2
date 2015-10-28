/*
 *  Drummer Details Component
 *
 *		React
 *		ReactDOM
 *
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var DrummerModel = require('../models/DrummerModel');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			drummer: null
		}
	},
	componentWillMount: function() {
		var query = new Parse.Query(DrummerModel);
		query
		.get(this.props.drummer).then(
			(drmr) => {
				this.setState({ drummer: drmr });
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render: function() {
		var content = (
			<p>loading...</p>
		);

		if(this.state.drummer) {
			content = (
				<div>
					<h1>{this.state.drummer.get('name')}</h1>
					<div><img src={this.state.drummer.get('photos')} /></div>
					<div>{this.state.drummer.get('years')}</div>
					<div>
						<h2>Bands</h2>
						<div>{this.state.drummer.get('bands')}</div>
					</div>
					<div>
						<h2>Years active</h2><p>{this.state.drummer.get('yearsActive')}</p>
						<h2>Background</h2>
						<div>{this.state.drummer.get('background')}</div>
						<h2>Videos</h2><a href={this.state.drummer.get('videos')}>watch this drummer!</a>
					</div>
				</div>
			);
		}

		return (
			<div>
				<div>
					{content}
				</div>
			</div>
		);
	}
});

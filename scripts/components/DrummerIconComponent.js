/*
 *  Drummer Icon Component
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
			drummers: []
		};
	},
	componentWillMount: function() {
		var query = new Parse.Query(DrummerModel);
		query
		.ascending('name')
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
		var content = (<div>loading... </div>);

		if(this.state.drummers) {
			content = this.state.drummers.map(function(drummer) {
				var photo = drummer.get('photos');
				var name = drummer.get('name');
				var id = drummer.get('objectId');
				return (
					<div key={drummer.id} className="icon-box">
						<a href={"#details/" + drummer.id}>
							<img src={photo} />
							<h3>{name}</h3>
						</a>
					</div>
				);
			});
		}

		return (
			<div className="icon-big-box">
				{content}
			</div>
		);
	}
});

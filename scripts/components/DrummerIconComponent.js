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
	getInitialState() {
		return {
			drummers: []
		};
	},
	componentWillMount() {
		var query = new Parse.Query(DrummerModel);
		query
		.descending('createdAt')
		.find().then(
			(drummer) => {
				this.setState({ drummers: drummer });
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render() {
		var content = (<div>loading... </div>);

		if(this.state.drummers) {
			content = this.state.drummers.map(function(drummer) {
				var photo = drummer.get('photos');
				var name = drummer.get('name');
				var id = drummer.get('objectId');
				return (
					<div key={drummer.id} className="icon-big-box">
						<div className="icon-box">
							<div className="photo-box">
								<a href={"#details/" + drummer.id}>
									<img src={photo} />
									<p>{name}</p>
								</a>
							</div>
						</div>
					</div>
				);
			});
		}

		return (
			<div className="icon-container">
				{content}
			</div>
		);
	}
});

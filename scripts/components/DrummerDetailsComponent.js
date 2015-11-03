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
	getInitialState() {
		return {
			drummer: null
		}
	},
	componentWillMount() {
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
	render() {
		var content = (
			<p>loading...</p>
		);

		if(this.state.drummer) {
			var name = (this.state.drummer.get('name'));
			var photos = (this.state.drummer.get('photos'));
			var years = (this.state.drummer.get('dates'));
			var bands = (this.state.drummer.get('bands'));
			var yearsActive = (this.state.drummer.get('yearsActive'));
			var background = (this.state.drummer.get('background'));
			var videos = (this.state.drummer.get('videos'));
			var videoPic = (this.state.drummer.get('videoPic'));

			content = (
				<div>
					<h1 className="detail-title">{name}</h1>
					<div className="detail-years">{years}</div>
					<div><img src={photos} /></div>
					<div>
						<h2>Bands</h2>
						<div>{bands}</div>
					</div>
					<div>
						<h2>Years active</h2><p>{yearsActive}</p>
						<h2>Background</h2>
						<div>{background}</div>
						<h2>Videos</h2>
						<a href={videos}><img src={videoPic} alt='watch this drummer!'/></a>
					</div>
				</div>
			);
		}

		return (
			<div className="details-container">
				{content}
			</div>
		);
	}
});

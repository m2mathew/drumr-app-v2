/*
 *  Add Drummer Component
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
	getInitialState() {
		return { error: null };
	},
	render() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (
				<p className="error-box">{this.state.error}</p>
			);
		}
		return (
			<div className="add-box">
				<form className="add-form" onSubmit={this.addNewDrummer}>
					<h1>Login</h1>
					{errorElement}
					<div className="name-input">
						<p><label htmlFor="name"><strong>Drummer Name</strong></label></p>
						<input type="text" ref="name" className="validate" id="email" />
					</div>
					<div className="band-input">
						<p><label htmlFor="band"><strong>Band(s) </strong>separated by commas</label></p>
						<input type="text" ref="band" className="validate" />
					</div>
					<div className="dates-input">
						<p><label htmlFor="dates"><strong>Dates </strong>example: born September 12, 1952</label></p>
						<input type="text" ref="dates" className="validate" />
					</div>
					<div className="active-input">
						<p><label htmlFor="active"><strong>Years Active</strong></label></p>
						<input type="text" ref="active" className="validate" />
					</div>
					<div className="background-input">
						<p><label htmlFor="background"><strong>Background</strong></label></p>
						<textarea type="text" ref="background" className="validate" />
					</div>
					<div className="photo-input">
						<p><label htmlFor="photo"><strong>Photo link </strong>(enter a url in the form of  http://drums.com/jazzdrums.png)</label></p>
						<input type="text" ref="photo" className="validate" />
					</div>
					<div className="video-input">
						<p><label htmlFor="video"><strong>Video link </strong>(enter a url in the form of  http://utoob.com/crazydrums)</label></p>
						<input type="text" ref="video" className="validate" />
					</div>
					<div className="vidpic-input">
						<p><label htmlFor="active"><strong>Video picture </strong>(enter a url in the form of  http://drumstick.com/drummerdood.png)</label></p>
						<input type="text" ref="vidpic" className="validate" />
					</div>
					<div className="button-container">
						<button className="register-button">Add Drummer</button>
					</div>
				</form>
			</div>
		);
	},
	addNewDrummer(e) {
		e.preventDefault();

		if(!this.refs.name.value || !this.refs.band.value || !this.refs.background.value || !this.refs.photo.value || !this.refs.video.value || !this.refs.vidpic.value || !this.refs.active.value || !this.refs.dates.value) {
			console.log('empty stuff');
		}
		else {
			console.log('input has a value');
		}

		// var drummer = new DrummerModel({
		// 	name: this.refs.name.value,
		// 	bands: this.refs.band.value,
		// 	background: this.refs.background.value,
		// 	photos: this.refs.photo.value,
		// 	videos: this.refs.video.value,
		// 	videoPic: this.refs.vidpic.value,
		// 	yearsActive: this.refs.active.value,
		// 	dates: this.refs.dates.value,
		// });
	}
});

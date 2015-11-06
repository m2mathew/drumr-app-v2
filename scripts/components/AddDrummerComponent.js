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
		return { error: null, counter: 0, title: '', button: '' };
	},
	render() {
		var errorElement = null;
		this.state.button = (
			<button className="add-button">Add Drummer</button>
			);

		if(this.state.counter === 0) {
			this.state.title = 'Add a Drummer';
		}
		else if(this.state.counter === 1) {
			this.state.title = 'Add another Drummer';
			this.state.button = (<button className="add-button">Add Another Drummer</button>);
		}
		else if(this.state.counter === 2) {
			this.state.title = 'Add yet another Drummer';
			this.state.button = (<button className="add-button">Add yet another Drummer</button>);
		}
		else if(this.state.counter === 3) {
			this.state.title = 'Are you still adding Drummers?';
			this.state.button = (<button className="add-button">Are you still adding Drummers?</button>);
		}
		else if(this.state.counter === 4) {
			this.state.title = 'You really like the Drummers, huh?';
			this.state.button = (<button className="add-button">You really like the Drummers, huh?</button>);
		}
		else if(this.state.counter >= 4) {
			this.state.title = 'Add all the Drummers!';
			this.state.button = (<button className="add-button">Add all the Drummers!</button>);
		}

		if(this.state.error) {
			errorElement = (
				<p className="error-box">{this.state.error}</p>
			);
		}
		return (
			<div className="add-box">
				<form className="add-form" onSubmit={this.addNewDrummer}>
					<h1>{this.state.title}</h1>
					{errorElement}
					<div className="name-input">
						<p><label htmlFor="name"><strong>Drummer Name</strong></label></p>
						<input autofocus="true" type="text" ref="name" className="name" placeholder="Sammy Cymbal"/>
					</div>
					<div className="band-input">
						<p><label htmlFor="bands"><strong>Band(s) </strong><small>separated by commas</small></label></p>
						<input type="text" ref="bands" className="bands" placeholder="Drumm Beet"/>
					</div>
					<div className="dates-input">
						<p><label htmlFor="dates"><strong>Dates </strong></label></p>
						<input type="text" ref="dates" className="dates" placeholder="born July 4, 1976"/>
					</div>
					<div className="active-input">
						<p><label htmlFor="active"><strong>Years Active</strong></label></p>
						<input type="text" ref="active" className="active" placeholder="1993 to present"/>
					</div>
					<div className="background-input">
						<p><label htmlFor="background"><strong>Background</strong></label></p>
						<textarea type="text" ref="background" className="background" placeholder="Sammy comes from a musical background, but threw all that away to become a drummer..." rows="4" />
					</div>
					<div className="photo-input">
						<p><label htmlFor="photo"><strong>Photo link </strong></label></p>
						<input type="text" ref="photo" className="photo" placeholder="http://yourwebsite.com/yourpicture.png"/>
					</div>
					<div className="video-input">
						<p><label htmlFor="video"><strong>Video link </strong></label></p>
						<input type="text" ref="video" className="video" placeholder="http://videowebsite.com/yourvideo"/>
					</div>
					<div className="vidpic-input">
						<p><label htmlFor="active"><strong>Video picture </strong></label></p>
						<input type="text" ref="vidpic" className="vidpic" placeholder="http://yourwebsite.com/videopicture.png"/>
					</div>
					<div className="button-container">
						{this.state.button}
					</div>
				</form>
			</div>
		);
	},
	addNewDrummer(e) {
		e.preventDefault();
		this.setState({ error: '' });

		var photoUrl = this.refs.photo.value.toLowerCase();
		var videoUrl = this.refs.video.value.toLowerCase();
		var videoPicUrl = this.refs.vidpic.value.toLowerCase();
		console.log(photoUrl);
		console.log(videoUrl);
		console.log(videoPicUrl);

		if(!this.refs.name.value || !this.refs.bands.value || !this.refs.background.value || !this.refs.photo.value || !this.refs.video.value || !this.refs.vidpic.value || !this.refs.active.value || !this.refs.dates.value) {
			this.setState({ error: 'Please enter data in all fields' });
		}
		else if( (photoUrl.indexOf('http://') == -1) && (photoUrl.indexOf('https://') == -1) ) {
			this.setState({ error: 'Photo URL must begin with http:// or https://' });
		}
		else if( ( (videoUrl.indexOf('http://') == -1) && (videoUrl.indexOf('https://') == -1) ) ) {
			this.setState({ error: 'Video URL must begin with http:// or https://' });
		}
		else if( ( (videoPicUrl.indexOf('http://') == -1) && (videoPicUrl.indexOf('https://') == -1) ) ) {
			this.setState({ error: 'Video Picture URL must begin with http:// or https://' });
		}
		else {
			this.setState({
				counter: this.state.counter + 1
			});

			var drummer = new DrummerModel({
				name: this.refs.name.value,
				bands: this.refs.bands.value,
				background: this.refs.background.value,
				photos: this.refs.photo.value,
				videos: this.refs.video.value,
				videoPic: this.refs.vidpic.value,
				yearsActive: this.refs.active.value,
				dates: this.refs.dates.value,
			});
			drummer.save();
		}
	}
});

/*
 *  List Component
 *
 *		React
 *		ReactDOM
 *
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var DrummerIconComponent = require('./DrummerIconComponent');

module.exports = React.createClass({
	render() {
		var content = (<div>loading...</div>);
		var favStar = (<i className="material-icons md-36">star_border</i>);
		var currentUser = Parse.User.current();

		console.log(this.props.drummers);
		if(this.props.drummers) {
			// this is grabbing the input correctly and converting it to lower case
			var input = this.props.filter.toLowerCase();

			var content = this.props.drummers.filter(function(drummer) {
				return (drummer.get('name').toLowerCase().indexOf(input) != -1);
			})
			.map(function(drummer) {
				return (
					<div key={drummer.id} className="icon-big-box">
						<div className="icon-box">
							<div className="photo-box">
								<a href={"#details/" + drummer.id}>
									<img src={drummer.get('photos')} />
									<p>{drummer.get('name')} {favStar}</p>
								</a>
							</div>
						</div>
					</div>
				);
			});
		}

		return (
			<div className="list-container">
				<div className="icon-container">
					{content}
				</div>
			</div>
		);
	}
});

// <DrummerIconComponent content={content} />

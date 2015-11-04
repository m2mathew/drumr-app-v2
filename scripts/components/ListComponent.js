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
var DrummerModel = require('../models/DrummerModel');
var FavoriteModel = require('../models/FavoriteModel');

module.exports = React.createClass({
	getInitialState() {
	    return {
	        favDrummers: [],
	    };
	},
	componentWillMount() {
		var currentUser = Parse.User.current();
		var favQuery = new Parse.Query(FavoriteModel);

		favQuery
		.equalTo('username', currentUser)
		.include('favoritedDrummer')
		.find().then(
			(drummer) => {
				this.setState({ favDrummers: drummer });

			},
			(err) => {
				console.log(err);
			}
		);
	},
	render() {
		var content = (<div>loading...</div>);
		var favStar = (<i className="favStar"><img src="../../images/full-star.png" /></i>);
		var currentUser = Parse.User.current();






		// if(this.props.drummers) {
			if(this.state.favDrummers.length > 0) {



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


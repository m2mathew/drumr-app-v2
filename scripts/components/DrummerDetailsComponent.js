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
var FavoriteModel = require('../models/FavoriteModel');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');

module.exports = React.createClass({
	getInitialState() {
		return {
			drummer: null,
			favDrummers: []
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

		var currentUser = Parse.User.current();
		var favQuery = new Parse.Query(FavoriteModel);

		favQuery
		.equalTo('username', currentUser)
		.include('favoritedDrummer')
		.find().then(
			(favorites) => {
				var drummerIds = _.groupBy(favorites, function(favorite) {
					return favorite.get('favoritedDrummer').id;
				})

				this.setState({ favDrummers: drummerIds });
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render() {
		// var favStar = (<i className="favStar"><img src="../../images/full-star.png" /></i>);
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

			console.log(this.state.favDrummers);

			if(this.state.favDrummers.drummerIds === this.state.drummer.id) {
				favStar = (<i className="favStar"><img src="../../images/full-star.png" /></i>);
				}
			else {
				favStar = (<i className="favStar"><img src="../../images/empty-star.png" /></i>);
			}

			content = (
				<div>
					<h1 className="detail-title">{name}</h1>
					<p onClick={this.addFavorite}>{favStar}</p>
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
	},
	addFavorite(e) {
		e.preventDefault();
		var hasFavorite = '';
		var currentUser = Parse.User.current();
		var drummer = new DrummerModel({
			objectId: this.state.drummer.id
		});
		var favorite = new FavoriteModel;

		var favQuery = new Parse.Query(FavoriteModel);

		favQuery
		.contains('username', currentUser.id)
		.contains('favoritedDrummer', this.state.drummer.id);

		console.log(favQuery);

		favorite.set('username', currentUser)
		.set('favoritedDrummer', drummer)
		.save();
	}
});

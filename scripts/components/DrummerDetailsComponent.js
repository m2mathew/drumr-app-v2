/*
 *  Drummer Details Component
 *
 *		React
 *		Backbone
 * 		Underscore
 *		Drummer Model
 *		Favorite Model
 *
 */

'use strict';

var React = require('react');
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
		var currentUser = Parse.User.current();

		var favQuery = new Parse.Query(FavoriteModel);
		var query = new Parse.Query(DrummerModel);
		query
		.get(this.props.drummer).then(
			(drmr) => {
				this.setState({ drummer: drmr });

				favQuery
				.equalTo('username', currentUser)
				.equalTo('favoritedDrummer', drmr)
				.first().then(
					(fav) => {
						this.setState({ favoritedDrummer: fav });
					},
					(err) => {
						console.log(err);
					}
				);
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render() {
		var favStar = (<i className="favStar"><img src="../../images/full-star.png" /></i>);
		var content = (
			<p>loading...</p>
		);

		if(this.state.drummer) {
			var name = (this.state.drummer.get('name'));
			var photos = (this.state.drummer.get('photos'));
			var years = (this.state.drummer.get('dates'));
			var bands = (this.state.drummer.get('bands'));
			var yearsActive = (this.state.drummer.get('yearsActive'));
			var genres = (this.state.drummer.get('genres'));
			var background = (this.state.drummer.get('background'));
			var videos = (this.state.drummer.get('videos'));
			var videoPic = (this.state.drummer.get('videoPic'));

			if(this.state.favoritedDrummer) {
				favStar = (<i className="favStar"><img src="../../images/full-star-big.png" /></i>);
				}
			else {
				favStar = (<i className="favStar"><img src="../../images/empty-star-big.png" /></i>);
			}

			content = (
				<div>
					<span><h1 className="detail-title">{name}</h1></span>
					<span onClick={this.toggleFavorite}>{favStar}</span>
					<p className="detail-years">{years}</p>
					<div><img src={photos} /></div>
					<div>
						<h2>Bands</h2>
						<p>{bands}</p>
						<h2>Years active</h2>
						<p>{yearsActive}</p>
						<h2>Genres</h2>
						<p>{genres}</p>
						<h2>Background</h2>
						<p>{background}</p>
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
	toggleFavorite(e) {
		e.preventDefault();
		var currentUser = Parse.User.current();
		var favorite = null;

		if(!this.state.favoritedDrummer) {
			favorite = new FavoriteModel;
			favorite.set('username', currentUser)
			.set('favoritedDrummer', this.state.drummer)
			.save();
		}
		else {
			this.state.favoritedDrummer.destroy();

		}
		this.setState({ favoritedDrummer: favorite });
	}
});

/*
 *  Favorite List Component
 *
 *		React
 *		React-Masonry
 *		ReactDOM
 *
 */

'use strict';

var React = require('react');
var Masonry = require('react-masonry-component')(React);
var ReactDOM = require('react-dom');
var FilterComponent = require('./FilterComponent');
var ListComponent = require('./ListComponent');
var DrummerModel = require('../models/DrummerModel');
var FavoriteModel = require('../models/FavoriteModel');
var masonryOptions = {
	transitionDuration: 0
};

module.exports = React.createClass({
	getInitialState() {
		return {
			drummers: [],
			filterText: ''
		};
	},
	componentWillMount() {
		var currentUser = Parse.User.current();
		var query = new Parse.Query(FavoriteModel);

		query
		.equalTo('username', currentUser)
		.include('favoritedDrummer')
		.find().then(
			(favorites) => {
				var drummers = favorites.map((favorite) => {
					return favorite.get('favoritedDrummer');
				});
				this.setState({ drummers: drummers });
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render() {
		return (
			<div className="favorites-container">
				<div className="filter-container">
					<FilterComponent filterVal={this.state.filterText} filterUpdate={this.stateUpdate} />
				</div>

				<h1>Favorites list</h1>

				<ListComponent filter={this.state.filterText} drummers={this.state.drummers} />
			</div>
		);
	},
	stateUpdate(value) {
		this.setState({ filterText: value });
	}
});

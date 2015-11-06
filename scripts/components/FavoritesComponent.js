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
			favDrummers: [],
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

		if(this.state.favDrummers) {
			if(this.state.favDrummers.length === 0) {
				content = (<h2>Select your favorite drummers from the <a href="#">list of drummers</a> or search for a drummer above</h2>);
			}
			if(this.state.favDrummers.length > 0) {
				content = this.state.favDrummers.map(function(drummer) {
					var photo = drummer.get('favoritedDrummer').get('photos');
					var name = drummer.get('favoritedDrummer').get('name');
					var id = drummer.get('favoritedDrummer').get('objectId');

					var band = drummer.get('favoritedDrummer').get('bands').split(',');
					var band = band[0];

					return (
						<li key={drummer.id} className="icon-big-box">
							<a href={"#details/" + drummer.get('favoritedDrummer').id}>
								<img className="drummer-pic" src={photo} />
								<p className="drummer-caption">{name} {favStar}</p>
								<p className="drummer-band">from {band}</p>
							</a>
						</li>
					);
				});
			}
		}

		return (
			<div className="favorites-container">
				<div className="filter-container">
					<FilterComponent filterVal={this.state.filterText} filterUpdate={this.stateUpdate} />
				</div>

				<h1>Favorites list</h1>
				<Masonry className={'my-gallery-class'}
	                elementType={'ul'}
	                options={masonryOptions}
	                disableImagesLoaded={false}	>
					{content}
				</Masonry>
			</div>
		);
	},
	stateUpdate(value) {
		this.setState({ filterText: value });
	}
});

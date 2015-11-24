/*
 *  List Component
 *
 *		React
 *		React-Masonry
 *		Backbone
 *		Underscore
 *		Drummer Model
 *		Favorite Model
 *
 */

'use strict';

var React = require('react');
var Masonry = require('react-masonry-component')(React);
var DrummerModel = require('../models/DrummerModel');
var FavoriteModel = require('../models/FavoriteModel');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');

var masonryOptions = {
	transitionDuration: 0
};

module.exports = React.createClass({
	getInitialState() {
		return {
			favDrummers: null
		};
	},
	componentWillMount() {
		var currentUser = Parse.User.current();
		var favQuery = new Parse.Query(FavoriteModel);

		// favQuery
		// .count('favoritedDrummer')
		// .find().then(
		// 	(favorites) => {

		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 	}
		// );

		favQuery
		.equalTo('username', currentUser)
		.include('favoritedDrummer')
		.find().then(
			(favorites) => {
				var drummerIds = _.groupBy(favorites, (favorite) => {
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
		var content = (<div>loading...</div>);
		var favStar = '';
		var currentUser = Parse.User.current();
		var favNum = null;

		if(this.state.favDrummers !== null) {
			var input = this.props.filter.toLowerCase();

			var content = this.props.drummers.filter( (drummer) => {
				var name = (drummer.get('name').toLowerCase().indexOf(input) != -1);
				var bands = (drummer.get('bands').toLowerCase().indexOf(input) != -1);
				return name + bands;
			})
			.map( (drummer) => {
				if(this.state.favDrummers.hasOwnProperty(drummer.id) && currentUser) {
					favStar = (<i className="favStar"><img src="../../images/full-star-big.png" /></i>);
				}
				else {
					favStar = (<i className="favStar"><img src="../../images/empty-star-big.png" /></i>);
				}

				var band = drummer.get('bands').split(',');
				var band = band[0];

				return (
					<li key={drummer.id} className="icon-big-box">
						<a href={"#details/" + drummer.id}>
							<img className="drummer-pic" src={drummer.get('photos')} />
							<p className="drummer-caption">{drummer.get('name')} {favStar}</p>
							<p className="drummer-band">from {band}</p>
						</a>
					</li>
				)
			});
		}

		return (
			<Masonry className={'my-gallery-class'}
					elementType={'ul'}
					options={masonryOptions}
					disableImagesLoaded={false}	>
					{content}
			</Masonry>
		);
	}
});


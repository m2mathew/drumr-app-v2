/*
 *  List Component
 *
 *		React
 *		React-Masonry
 *		ReactDOM
 *		Backbone
 *		Underscore
 *		Drummer Model
 *		Favorite Model
 *
 */

'use strict';

var React = require('react');
var Masonry = require('react-masonry-component')(React);
var ReactDOM = require('react-dom');
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
		var list
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
		var content = (<div>loading...</div>);
		var favStar = '';
		var currentUser = Parse.User.current();

		if(this.state.favDrummers != null) {
			// this is grabbing the input correctly and converting it to lower case
			var input = this.props.filter.toLowerCase();

			var content = this.props.drummers.filter(function(drummer) {
				return (drummer.get('name').toLowerCase().indexOf(input) != -1);
			})
			.map( (drummer) => {
				if(this.state.favDrummers.hasOwnProperty(drummer.id)) {
					favStar = (<i className="favStar"><img src="../../images/full-star.png" /></i>);
				}
				else {
					favStar = (<i className="favStar"><img src="../../images/empty-star.png" /></i>);
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


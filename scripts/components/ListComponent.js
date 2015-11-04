/*
 *  List Component
 *
 *		React
 *		ReactDOM
 *		Backbone
 *		Underscore
 *		Drummer Model
 *		Favorite Model
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


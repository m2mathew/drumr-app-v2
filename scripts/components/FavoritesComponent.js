/*
 *  Favorite List Component
 *
 *		React
 *		ReactDOM
 *
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var FilterComponent = require('./FilterComponent');
var DrummerIconComponent = require('./DrummerIconComponent');
var DrummerModel = require('../models/DrummerModel');
var FavoriteModel = require('../models/FavoriteModel');

module.exports = React.createClass({
	getInitialState() {
	    return {
	        favDrummers: []
	    };
	},
	componentWillMount() {
		var currentUser = Parse.User.current();

		var innerQuery = new Parse.Query(DrummerModel);
		var query = new Parse.Query(FavoriteModel);

		query
		.matchesQuery('favoritedDrummer', innerQuery)
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
		var favStar = (<i className="material-icons md-36">star_border</i>);

		if(!this.state.favDrummers) {
			content = (<h2>Select your favorite drummers from the <a href="#">list of drummers</a> or search for a drummer above</h2>);
		}
		if(this.state.favDrummers) {
			content = this.state.favDrummers.map(function(drummer) {
				var photo = drummer.get('favoritedDrummer').get('photos');
				var name = drummer.get('favoritedDrummer').get('name');
				var id = drummer.get('favoritedDrummer').get('objectId');
				return (
					<div key={drummer.id} className="icon-big-box">
						<div className="icon-box">
							<div className="photo-box">
								<a href={"#details/" + drummer.id}>
									<img src={photo} />
									<p>{name} {favStar}</p>
								</a>
							</div>
						</div>
					</div>
				);
			});
		}

		return (
			<div className="favorites-container">
				<div className="filter-container">
					<FilterComponent filterVal={this.state.filterText} filterUpdate={this.stateUpdate} />
				</div>

				<h1>favorites list</h1>
				<DrummerIconComponent content={content} />
			</div>
		);
	}
});



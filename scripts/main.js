/*
 *  drumr main.js
 *
 *		React
 *		ReactDOM
 *		Parse credentials
 *		Backbone router
 *		Underscore
 *		jQuery
 *
 */

'use strict';

Parse.initialize("WyJ1nIiGhD3Dbm9bDzM7oX51MCEmaM716376q6wE", "CwqeTVxr7zr7BtORZo79pP0AoYRYscaFq8NmIojx");
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore/underscore-min');

window.$ = require('jquery');
window.jQuery = $;

var NavigationComponent = require('./components/NavigationComponent');
var HomeComponent = require('./components/HomeComponent');
var DrummerDetailsComponent = require('./components/DrummerDetailsComponent');
var FavoritesComponent = require('./components/FavoritesComponent');
var LoginComponent = require('./components/LoginComponent');
var RegisterComponent = require('./components/RegisterComponent');
var AddDrummerComponent = require('./components/AddDrummerComponent');

var app = document.getElementById('app');
var currentuser = Parse.User.current();

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'details/:id': 'details',
		'favorites(/:id)': 'favorites',
		'add': 'add',
		'login': 'login',
		'register': 'register'
	},
	home: function() {
		ReactDOM.render(
			<HomeComponent router={r} />, app
		);
	},
	details: function(id) {
		ReactDOM.render(
			<DrummerDetailsComponent drummer={id} />, app
		);
	},
	favorites: function() {
		if(!currentuser) {
			ReactDOM.render(
				<HomeComponent router={r} />, app
			);
		}
		else {
			ReactDOM.render(
				<FavoritesComponent router={r} />, app
			);
		}
	},
	add: function() {
		if(!currentuser) {
			ReactDOM.render(
				<HomeComponent router={r} />, app
			);
		}
		else {
			ReactDOM.render(
				<AddDrummerComponent router={r} />, app
			);
		}
	},
	login: function(){
		ReactDOM.render(
			<LoginComponent router={r} />, app
		);
	},
	register: function() {
		ReactDOM.render(
			<RegisterComponent router={r} />, app
		);
	}
});

var r = new Router;
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
	);

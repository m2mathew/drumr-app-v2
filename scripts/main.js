/*
 *  earDrum main.js
 *
 *		Parse credentials
 *		Backbone router
 *
 */

'use strict';

Parse.initialize("WyJ1nIiGhD3Dbm9bDzM7oX51MCEmaM716376q6wE", "CwqeTVxr7zr7BtORZo79pP0AoYRYscaFq8NmIojx");
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

window.$ = require('jquery');
window.jQuery = $;

var NavigationComponent = require('./components/NavigationComponent');
var FilterBoxComponent = require('./components/FilterBoxComponent');
var FilterComponent = require('./components/FilterComponent');
var FilterResultsComponent = require('./components/FilterResultsComponent');
var DrummerListComponent = require('./components/DrummerListComponent');
var DrummerIconComponent = require('./components/DrummerIconComponent');
var DrummerDetailsComponent = require('./components/DrummerDetailsComponent');
var FavoriteListComponent = require('./components/FavoriteListComponent');
var LoginComponent = require('./components/LoginComponent');
var RegisterComponent = require('./components/RegisterComponent');

var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'details/:id': 'details',
		'favorites': 'favorites',
		'results': 'search',
		'login': 'login',
		'register': 'register'
	},
	home: function(){
		ReactDOM.render(
			<DrummerListComponent router={r} />, app
		);
	},
	details: function(id){
		ReactDOM.render(
			<DrummerDetailsComponent drummer={id} />, app
		);
	},
	favorites: function(){
		ReactDOM.render(
			<FavoriteListComponent router={r} />, app
		);
	},
	search: function(id){
		ReactDOM.render(
			<FilterResultsComponent drummer={id} />, app
		);
	},
	login: function(){
		ReactDOM.render(
			<LoginComponent router={r} />, app
		);
	},
	register: function(){
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

ReactDOM.render(
	<FilterBoxComponent router={r} />,
	document.getElementById('search')
	);

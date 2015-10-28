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
var SearchComponent = require('./components/SearchComponent');
var DrummerListComponent = require('./components/DrummerListComponent');
var DrummerIconComponent = require('./components/DrummerIconComponent');
var DrummerDetailsComponent = require('./components/DrummerDetailsComponent');
var FavoriteListComponent = require('./components/FavoriteListComponent');
var SearchResultsComponent = require('./components/SearchResultsComponent');
var LoginComponent = require('./components/LoginComponent');
var RegisterComponent = require('./components/RegisterComponent');

var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'details': 'details',
		'favorites': 'favorites',
		'results': 'results',
		'login': 'login',
		'register': 'register'
	},
	home: function(){
		ReactDOM.render(
			<DrummerListComponent router={r} />, app
		);
	},
	details: function(){
		ReactDOM.render(
			<DrummerDetailsComponent router={r} />, app
		);
	},
	favorites: function(){
		ReactDOM.render(
			<FavoriteListComponent router={r} />, app
		);
	},
	results: function(){
		ReactDOM.render(
			<SearchResultsComponent router={r} />, app
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
	<SearchComponent router={r} />,
	document.getElementById('search')
	);

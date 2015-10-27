/*
 *  Navigation Component
 *
 *		React
 *		ReactDOM
 *		Backbone router
 *
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var SearchComponent = require('./SearchComponent');

module.exports = React.createClass({
	componentWillMount: function() {
		this.props.router.on('route', () => {
			this.forceUpdate();
		});
	},
	render: function() {
		var currentUser = Parse.User.current();
		var currentPage = Backbone.history.getFragment();

		var links = [
			<a href="#" key="home"><div className={currentPage === '' ? 'active nav-link' : 'nav-link'}>Top Drummers</div></a>,
		];

		if(currentUser) {
			links.push(<a href="#favorites" key="fav"><div className={currentPage === 'favorites' ? 'active nav-link' : 'nav-link'}>Favorites</div></a>);
			links.push(<a href="#logout" key="logout" onClick={this.onLogout}><div className="nav-link">Logout</div></a>);
			links.push(<div key="username" className="displayedUser">{currentUser.getEmail()}</div>);
		}
		else {
			links.push(<a href="#login" key="login"><div className={currentPage === 'login' ? 'active nav-link' : 'nav-link'}>Login</div></a>);
			links.push(<a href="#register" key="register"><div className={currentPage === 'register' ? 'active nav-link' : 'nav-link'}>Register</div></a>);
		}

		return (
			<div className="nav-wrapper">
				<div>
					<a href="#!" className="site-logo"><h1>earDrum</h1></a>
				</div>
				<div className="right hide-on-med-and-down">
					{links}
				</div>
			</div>
		);
	},
	onLogout: function(e) {
		e.preventDefault();
		Parse.User.logOut();
		this.props.router.navigate('', {trigger: true});
	}
});

// <SearchComponent />

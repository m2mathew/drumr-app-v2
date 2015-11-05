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

module.exports = React.createClass({
	componentWillMount() {
		this.props.router.on('route', () => {
			this.forceUpdate();
		});
	},
	render() {
		var currentUser = Parse.User.current();
		var currentPage = Backbone.history.getFragment();

		var links = [
			<li key="home" className={currentPage === '' ? 'active nav-link' : 'nav-link'}><a href="#">Top Drummers</a></li>
		];

		if(currentUser) {
			links.push(<li key="fav" className={currentPage === 'favorites' ? 'active nav-link' : 'nav-link'}><a href="#favorites">Favorites</a></li>);
			links.push(<li key="add" className={currentPage === 'add' ? 'active nav-link' : 'nav-link'}><a href="#add">Add Drummers</a></li>);
			links.push(<li key="logout" className="nav-link"><a href="#logout" onClick={this.onLogout}>Logout</a></li>);
			links.push(<li key="username" className="displayedUser">{currentUser.getEmail()}</li>);
		}
		else {
			links.push(<li key="register" className={currentPage === 'register' ? 'active nav-link' : 'nav-link'}><a href="#register">Register</a></li>);
			links.push(<li key="login" className={currentPage === 'login' ? 'active nav-link' : 'nav-link'}><a href="#login">Login</a></li>);
		}

		return (
			<div className="nav-wrapper">
				<div className="site-logo">
					<a href="#"><img src="../../images/drumr-logo.png" /></a>
				</div>
				<ul className="nav-links">
					{links}
				</ul>
			</div>
		);
	},
	onLogout(e) {
		e.preventDefault();
		Parse.User.logOut();
		this.props.router.navigate('', {trigger: true});
		this.forceUpdate();
	}
});

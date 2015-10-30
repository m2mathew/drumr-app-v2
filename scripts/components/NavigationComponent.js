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
			<a href="#" key="home"><div className={currentPage === '' ? 'active nav-link' : 'nav-link'}>Top Drummers</div></a>,
		];

		if(currentUser) {
			links.unshift(<a href="#favorites" key="fav"><div className={currentPage === 'favorites' ? 'active nav-link' : 'nav-link'}>Favorites</div></a>);
			links.unshift(<a href="#logout" key="logout" onClick={this.onLogout}><div className="nav-link">Logout</div></a>);
			links.unshift(<div key="username" className="displayedUser">{currentUser.getEmail()}</div>);
		}
		else {
			links.unshift(<a href="#register" key="register"><div className={currentPage === 'register' ? 'active nav-link' : 'nav-link'}>Register</div></a>);
			links.unshift(<a href="#login" key="login"><div className={currentPage === 'login' ? 'active nav-link' : 'nav-link'}>Login</div></a>);
		}

		return (
			<div className="nav-wrapper">
				<div className="site-logo">
					<a href="#!"><img src="../../images/drumr-logo2.png" /></a>
				</div>
				<div className="nav-links">
					{links}
				</div>
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

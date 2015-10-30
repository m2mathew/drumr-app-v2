/*
 *  Login Component
 *
 *		React
 *		ReactDOM
 *
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

module.exports = React.createClass({
	getInitialState() {
		return { error: null };
	},
	render() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (
				<p className="error-box">{this.state.error}</p>
			);
		}
		return (
			<div className="login-box">
				<form className="login-form" onSubmit={this.onLogin}>
					<h1>Login</h1>
					{errorElement}
					<div className="email-input">
						<p><label htmlFor="email">Email Address</label></p>
						<input type="text" ref="email" className="validate" id="email" />
					</div>
					<div className="password-input">
						<p><label htmlFor="password">Password</label></p>
						<input type="password" ref="password" className="validate" id="password" />
					</div>
					<div className="button-container">
						<button className="register-button">Login</button>
					</div>
				</form>
			</div>
		);
	},
	onLogin(e) {
		e.preventDefault();
		var user = new Parse.User();
		Parse.User.logIn(
			this.refs.email.value,
			this.refs.password.value,
			{
				success: (u) => {
					this.props.router.navigate('', {trigger: true});
				},
				error: (u, error) => {
					this.setState({
						error: error.message
					});
				}
			}
		);
	}
});

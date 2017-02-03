/*
 *  Register Component
 *
 *		React
 *		Backbone
 *
 */

'use strict';

var React = require('react');
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
			<div className="register-box">
				<form className="register-form" onSubmit={this.onRegister}>
					<h1>Register</h1>
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
						<button className="register-button">Register</button>
					</div>
				</form>
			</div>
		);
	},
	onRegister(e) {
		e.preventDefault();
		// var user = new Parse.User();
		// user.signUp(
		// 	{
		// 		username: this.refs.email.value,
		// 		password: this.refs.password.value,
		// 		email: this.refs.email.value
		// 	},
		// 	{
		// 		success: (u) => {
		// 			this.props.router.navigate('', {trigger: true});
		// 		},
		// 		error: (u, error) => {
		// 			this.setState({
		// 				error: error.message
		// 			});
		// 		}
		// 	}
		// );
	}
});

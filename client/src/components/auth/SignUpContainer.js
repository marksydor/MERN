import React from 'react';
import Signup from './Signup.jsx';
import {connect} from 'react-redux';
import {authSignup} from '../../redux/auth-reducer.js';
import * as axios from 'axios';

class SignUpContainer extends React.Component {
	// componentDidMount() {
	// 	let data = localStorage.getItem('userData');
	// 	if (data && data.token) {
	// 		this.props.checkLogin(data.token);
	// 	}
	// }

	OnSubmit = (email, password, confirmPassword) => {
		this.props.authSignup(email, password, confirmPassword)
	}

	render() {
		return <Signup {...this.props} OnSubmit={this.OnSubmit} />
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, {authSignup})(SignUpContainer); 
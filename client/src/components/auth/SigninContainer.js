import React from 'react';
import Signin from './Signin.jsx';
import {connect} from 'react-redux';
import {authSignin, authSetError, toggleIsFetching} from '../../redux/auth-reducer.js';
import * as axios from 'axios';

class SigninContainer extends React.Component {
	componentDidMount() {
		
	}

	componentWillUnmount() {
		this.props.authSetError(null);
	}

	OnSubmit = async (email, password) => {
		this.props.toggleIsFetching(true);
		await this.props.authSignin(email, password);
	}

	render() {
		return <Signin {...this.props} OnSubmit={this.OnSubmit} />
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth,
		error: state.auth.error,
		isFetching: state.auth.isFetching
	}
}

export default connect(mapStateToProps, {authSignin, authSetError, toggleIsFetching})(SigninContainer); 
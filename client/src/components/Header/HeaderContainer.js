import React from 'react';
import Header from './Header.jsx';
import {connect} from 'react-redux';
// import {authSetUser, authSetToken, authLogout, checkLogin, login} from '../../redux/auth-reducer.js';
import * as axios from 'axios';

class HeaderContainer extends React.Component {
	// componentDidMount() {
	// 	let data = localStorage.getItem('userData');
	// 	if (data && data.token) {
	// 		this.props.checkLogin(data.token);
	// 	}
	// }

	

	render() {
		return <Header {...this.props} onLogin = {this.onLogin} />
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, {})(HeaderContainer); 


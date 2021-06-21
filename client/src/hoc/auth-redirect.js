import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

const mapStateToPropsForRedirect = (state) => {
	return ({
		isAuth: state.auth.auth
	});
}

export const withAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render () {
			if (!this.props.isAuth) {
				return <Redirect to='/login' />
			}
			return <Component {...this.props}/>
		}
	}

	let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

	return ConnectedAuthRedirectComponent;
}
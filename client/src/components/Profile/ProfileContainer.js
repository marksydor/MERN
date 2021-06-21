import React, { useEffect } from 'react';
import s from './Profile.module.css';
import {addPost, updateNewPostText, getUser} from '../../redux/profile-reducer.js';
import Profile from './Profile.jsx';
import ProfileEditMode from './ProfileEditMode.jsx';
import {connect} from 'react-redux';
import {compose} from 'redux';
import * as axios from 'axios';
import Preloader from '../common/Preloader';
import {withRouter, Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/auth-redirect.js';


const mapStateToProps = (state) => {
	return ({...state.profilePage, authId: state.auth.userId});
}

const ProfileContainer = (props) => {
	let userId = props.match.params.userId;
	useEffect(() => {	
		if (userId)
			props.getUser(userId)
	}, [])

	if (userId != props.authId)
		return (props.isFetching ? <Preloader /> : <Profile {...props} />)
	return (props.isFetching ? <Preloader /> : <ProfileEditMode {...props} />)
}

const withRouterProfileContainer = withRouter(ProfileContainer)

export default connect(mapStateToProps, {addPost, updateNewPostText, getUser})(withRouterProfileContainer);

import {usersAPI} from '../api/api.js'

const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';

let initialState = {
	currentPost: '',
	profile: null,
	isFetching: false
}

const profileReducer = (state = initialState, action) => {
	let stateCopy;

	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: 6,
				mess: state.currentPost,
				likesCount: 94
			}
			stateCopy = {
				...state,
				posts: [...state.posts],
				currentPost: ''
			}
			stateCopy.posts.push(newPost);
			return (stateCopy);
		case UPDATE_POST_TEXT:
			stateCopy = {
				...state,
				currentPost: action.message
			}
			return (stateCopy);
		case SET_USER_PROFILE:
			stateCopy = {
				...state,
				profile: action.profile
			}
			return (stateCopy);
		case TOGGLE_IS_FETCHING:
			stateCopy = {
				...state,
				isFetching: action.isFetching
			}
			return (stateCopy);
		default:
			return (state);
	}
}

export const addPost = () => {
	return ({type: ADD_POST});
}

export const updateNewPostText = (text) => {
	return ({type: UPDATE_POST_TEXT, message: text});
}

export const setUserProfile = (profile) => {
	return ({type: SET_USER_PROFILE, profile: profile});
}

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const getUser = (userId) => {
	return (dispatch) => {
		dispatch(toggleIsFetching(true));
		usersAPI.getProfile(userId)
			.then(response => {
				dispatch(toggleIsFetching(false));
				dispatch(setUserProfile(response));
			})
	}
}

export default profileReducer;
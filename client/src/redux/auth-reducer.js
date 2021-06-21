import {authAPI} from '../api/api.js';

const SET_TOKEN = 'SET-TOKEN';
const SET_USER = 'SET-USER'; 
const SET_ERROR = 'SET-ERROR';
const SIGNOUT = 'SIGNOUT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';

const initialState = {
	token: null,
	userId: '60cf8cb0fa8d810cf863e4b5',
	userName: null,
	userEmail: null,
	isAuth: true,
	error: null,
	isFetching: false,
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ERROR:
			return {...state, error: action.error}
		case SET_TOKEN: 
			return {...state, token: action.token, isAuth: true};
		case SET_USER:
			return {...state, userId: action.userId, userName: action.userName, userEmail: action.userEmail}
		case SIGNOUT:
			return {...state, userId: null, token: null, isAuth: false, userName: null, userEmail: null}
		case TOGGLE_IS_FETCHING:
			return {...state, isFetching: action.isFetching}
		default:
			return (state);
	}
}

export const authSetUser = (user) => {
	return {type: SET_USER, userId: user.userId, userName: user.userName, userEmail: user.userEmail};
}

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching});

export const authSetError = (error) => ({type: SET_ERROR, error: error});

export const authSetToken = (token) => ({type: SET_TOKEN, token: token});

export const authSignoutAC = () => ({type: SIGNOUT});

export const authSignup = (email, password, confirmPassword) => {
	return (dispatch) => {
		authAPI.signUp(email, password, confirmPassword).then(alert('+'));
	}
}

export const authSignin = (email, password) => {
	return (dispatch) => {
		authAPI.signin(email, password)
		.then(response => {
			if (response instanceof Error) {
				dispatch(authSetError(response.response.data));
			} else {
				dispatch(authSetUser(response));
				dispatch(authSetToken(response.token));
			}
		})
	}
}

export const authSignout = (email, password) => {
	return (dispatch) => {
		dispatch(authSignoutAC());
		authAPI.signout();
		debugger;
	}
}



export default authReducer;
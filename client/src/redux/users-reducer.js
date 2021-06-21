import {usersAPI} from '../api/api.js'

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USER_COUNT = 'SET-TOTAL-USER-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE-FOLLOWING-IN-PROGRESS';

let initialState = {
	users: [ ],
	currentPage: 1,
	pageSize: 9,
	totalUsersCount: null,
	isFetching: true,
	followingInProgress: false
}

const usersReducer = (state = initialState, action) => {
	let stateCopy;

	switch (action.type) {
		case FOLLOW:
			stateCopy = {
				...state,
				users: state.users.map((item) => {
					if (item.userId === action.userId) {
						return {...item, followed: true}
					}
					return item;
				})
			}
			return (stateCopy);
		case UNFOLLOW:
			stateCopy = {
				...state,
				users: state.users.map((item) => {
					if (item.userId === action.userId) {
						return {...item, followed: false}
					}
					return item;
				})
			}
			return (stateCopy);
		case SET_USERS:
			if (action.users) {
				stateCopy = {
					...state,
					users: [ ...action.users ]
				}
				return (stateCopy);
			}
			return (state);
		case SET_CURRENT_PAGE:
			stateCopy = {
				...state,
				currentPage: action.page
			}
			return (stateCopy);
		case SET_TOTAL_USER_COUNT:
			stateCopy = {
				...state,
				totalUsersCount: action.count
			}
			return (stateCopy);
		case TOGGLE_IS_FETCHING:
			stateCopy = {
				...state,
				isFetching: action.isFetching
			}
			return (stateCopy);
		case TOGGLE_FOLLOWING_IN_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFollowInProgress
			}
		default:
			return (state);
	}
}

export const follow = (userId) => ({type: FOLLOW, userId: userId});

export const unfollow = (userId) => ({type: UNFOLLOW, userId: userId});

export const setUsers = (users) => ({type: SET_USERS, users});

export const setTotalUsersCount = (count) => ({type: SET_TOTAL_USER_COUNT, count});

export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const toggleIsFollowInProgress = (isFollowInProgress) => ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFollowInProgress})


export const getUsers = (currentPage, pageSize) => {
	return (dispatch) => {
		dispatch(toggleIsFetching(true));
		dispatch(setCurrentPage(currentPage));
		usersAPI.getUsers(currentPage, pageSize)
			.then(response => {
				dispatch(toggleIsFetching(false));
				dispatch(setUsers(response.users));
				dispatch(setTotalUsersCount(response.total));
			})
	}
}

export const getFollow = (userId) => {
	return (dispatch) => {
		dispatch(toggleIsFollowInProgress(true));
		usersAPI.follow(userId)
			.then(response => {
				dispatch(follow(userId));
				dispatch(toggleIsFollowInProgress(false));
			})
	}
}

export const getUnfollow = (userId) => {
	return (dispatch) => {
		dispatch(toggleIsFollowInProgress(true));
		usersAPI.follow(userId)
			.then(response => {
				dispatch(follow(userId));
				dispatch(toggleIsFollowInProgress(false));
			})
	}
}

export default usersReducer;
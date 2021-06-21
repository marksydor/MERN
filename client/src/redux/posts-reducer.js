import {postsAPI} from '../api/api.js'

const SET_POSTS = 'SET-POSTS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_POSTS_COUNT = 'SET-TOTAL-POSTS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';

let initialState = {
	posts: [ ],
	currentPage: 1,
	pageSize: 4,
	totalPostsCount: null,
	isFetching: true,
}

const postsReducer = (state = initialState, action) => {
	let stateCopy;

	switch (action.type) {
		case SET_POSTS:
			if (action.posts) {
				stateCopy = {
					...state,
					posts: [ ...action.posts ]
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
		case SET_TOTAL_POSTS_COUNT:
			stateCopy = {
				...state,
				totalPostsCount: action.count
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

export const setPosts = (posts) => ({type: SET_POSTS, posts});

export const setTotalPostsCount = (count) => ({type: SET_TOTAL_POSTS_COUNT, count});

export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const getPosts = (currentPage, pageSize) => {
	return (dispatch) => {
		dispatch(toggleIsFetching(true));
		dispatch(setCurrentPage(currentPage));
		postsAPI.getPosts(currentPage, pageSize)
			.then(response => {
				dispatch(toggleIsFetching(false));
				dispatch(setPosts(response.posts));
				dispatch(setTotalPostsCount(response.total));
			})
	}
}

export default postsReducer;
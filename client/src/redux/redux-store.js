import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import profileReducer from './profile-reducer.js';
import dialogsReducer from './dialogs-reducer.js';
import usersReducer from './users-reducer.js';
import authReducer from './auth-reducer.js';
import postReducer from './posts-reducer.js';

let reducers = combineReducers({
	profilePage: profileReducer, 
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	posts: postReducer,
	form: formReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
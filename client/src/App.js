import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer.js';
import ProfileContainer from './components/Profile/ProfileContainer.js';
import SigninContainer from './components/auth/SigninContainer.js';
import FriendsContainer from './components/Friends/FriendsContainer.js';
import NewsContainer from './components/News/NewsContainer.js';



// -- тимчасові

import SignUpContainer from './components/auth/SignUpContainer.js';
import Forgot from './components/auth/Forgot.jsx';
import ChangePassword from './components/auth/ChangePassword.jsx';

// --

const App = (props) => {
	return (
		<BrowserRouter>
			<div className='app-wrapper'>
				<HeaderContainer />
				<Route path='/profile/:userId' render={() => <ProfileContainer />} />
				<Route path='/signin' render={() => <SigninContainer />} />
				<Route path='/signup' render={() => <SignUpContainer />} />
				<Route path='/forgot' render={() => <Forgot />} />
				<Route path='/change-password' render={() => <ChangePassword />} />
				<Route path='/friends' render={() => <FriendsContainer />} />
				<Route path='/news' render={() => <NewsContainer />} />
			</div>
			hei
		</BrowserRouter>
	);
}

export default App;

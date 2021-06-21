import React from 'react';
import styles from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {authSignout} from '../../redux/auth-reducer.js';
import { FaRegNewspaper } from 'react-icons/fa';
import { RiGroupLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { BiLogIn, BiLogOut, BiChat, BiBookAlt, BiHomeHeart, BiSearch} from 'react-icons/bi';

const NavItem = (props) => {
	return (<li className="nav-item">
			<NavLink className="nav-link mx-1" to={props.to}>{props.text} {props.img}</NavLink>
		</li>)
}


const Header = (props) => {

	const onClick = () => {
		props.authSignout();
	}

	return (<header> 
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-0 w-100">
				<div className="container-md">
						<NavLink className="navbar-brand" to="/home">Social Network<BiHomeHeart /></NavLink>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<NavItem to='/news' text='News' img={<FaRegNewspaper />}/>
							<NavItem to='/friends' text='Friends' img={<RiGroupLine />}/>
							{!props.isAuth && <NavItem to='/signin' text='Signin' img={<BiLogIn />}/>}
							{props.isAuth && <NavItem to='/me' text='My profile' img={<CgProfile />}/>}
							{props.isAuth && <NavItem to='/chats' text='Chats' img={<BiChat />}/>}
							<NavItem to='/about' text='About Us' img={<BiBookAlt />}/>
						</ul>
						<form className="d-flex">
							<input className="form-control me-2" type="search" placeholder={"Search"} aria-label="Search"/>
							<button className="btn btn-outline-success" type="submit">Find<BiSearch /></button>
							{props.isAuth && <button className="btn btn-outline-danger ms-2" onClick={onClick} type="submit">Exit<BiLogOut /></button>}
						</form>
					</div>
				</div>
			</nav>
		</header>)
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth 
	}
}

export default connect(mapStateToProps, {authSignout})(Header); ;
import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
	return (<div className = { styles.sidebar }>
			<nav>
				<NavLink to="/profile" activeClassName={styles.activeLink} className = { styles.navbtn + " " + styles.btnRadUp }>Profile</NavLink>
				<NavLink to="/dialogs" activeClassName={styles.activeLink} className = { styles.navbtn }>Messages</NavLink>
				<NavLink to="/friends" activeClassName={styles.activeLink} className = { styles.navbtn }>Friends</NavLink>				
				<NavLink to="/content" activeClassName={styles.activeLink} className = { styles.navbtn }>News</NavLink>	
				<NavLink to="/users" activeClassName={styles.activeLink} className = { styles.navbtn }>Users</NavLink>							
				<NavLink to="/setings" activeClassName={styles.activeLink} className = { styles.navbtn + " " + styles.btnRadDown }>Setings</NavLink>
			</nav>
		</div>)
;}

export default Sidebar;
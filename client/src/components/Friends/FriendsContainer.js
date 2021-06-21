import React, { useEffect } from 'react';
import Friends from './Friends.jsx'
import {setCurrentPage, getUsers} from '../../redux/users-reducer.js';
import {connect} from 'react-redux';

const FriendsContainer = (props) => {
	useEffect(() => {
		if (props.totalUsersCount === null)
			props.getUsers(props.currentPage, props.pageSize);
	});

	const onPageChange = (pageNumber) => {
		props.getUsers(pageNumber, props.pageSize);
	}

	return (<Friends 	totalUsersCount={props.totalUsersCount}
						pageSize={props.pageSize} 
						currentPage={props.currentPage} 
						users={props.users}
						onPageChange={onPageChange}
						isFetching={props.isFetching}
			/>);
}

const mapStateToProps = (state) => {
	return {
		users: state.usersPage.users,
		currentPage: state.usersPage.currentPage,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		isFetching: state.usersPage.isFetching,
	};
}

export default connect(mapStateToProps, {setCurrentPage, getUsers})(FriendsContainer);
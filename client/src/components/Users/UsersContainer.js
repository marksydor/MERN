import React from 'react';
import {follow, unfollow, setCurrentPage, getUsers} from '../../redux/users-reducer.js';
import {connect} from 'react-redux';
import * as axios from 'axios';
import Users from './Users.jsx';
import Preloader from '../common/Preloader';

class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageSize);
	}

	onPageChange = (pageNumber) => {
		this.props.getUsers(pageNumber, this.props.pageSize);
	}

	onFollow = (userId) => {
		this.props.follow(userId);
	}

	onUnfollow = (userId) => {
		this.props.unfollow(userId);
	}

	render () {
		return (<>
			{ this.props.isFetching ? <Preloader /> : null}
			<Users 	totalUsersCount={this.props.totalUsersCount}
						pageSize={this.props.pageSize} 
						currentPage={this.props.currentPage} 
						users={this.props.users}
						unfollow={this.props.unfollow}
						follow={this.props.follow}
						onPageChange={this.onPageChange}
			/> 
		</>);
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.usersPage.users,
		currentPage: state.usersPage.currentPage,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		isFetching: state.usersPage.isFetching,
		isFollowInProgress: state.usersPage.isFollowInProgress
	};
}

export default connect(mapStateToProps, {follow, unfollow, setCurrentPage, getUsers})(UsersContainer);
import React, {useEffect} from 'react';
import News from './News.jsx'
import {setCurrentPage, getPosts} from '../../redux/posts-reducer.js';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/auth-redirect.js';


const mapStateToProps = (state) => {
	return ({...state.posts});
}

const NewsContainer = (props) => {
	useEffect(() => {
		if (props.totalPostsCount === null) {
			props.getPosts(props.currentPage, props.pageSize);
		}
	});

	const onPageChange = (pageNumber) => {
		props.getPosts(pageNumber, props.pageSize);
	}

	return (<News 	totalPostsCount={props.totalPostsCount}
					pageSize={props.pageSize} 
					currentPage={props.currentPage} 
					posts={props.posts}
					onPageChange={onPageChange}
					isFetching={props.isFetching}
		/>)
}

export default connect(mapStateToProps, {setCurrentPage, getPosts})(NewsContainer);
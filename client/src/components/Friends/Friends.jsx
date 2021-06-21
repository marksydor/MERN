import React from 'react';
import { NavLink } from 'react-router-dom';
import noImage from '../../assets/images/noimage.png';
import Pagination from '../common/Pagination.jsx';
import Preloader from '../common/Preloader';

const FriendItem = (props) => {
	return ( <div className="col" key={props.index}>
		<div className="card h-100 p-1">
			<NavLink to={`/profile/${props.userId}`}>
				<img src={props.avatar ? props.avatar : noImage} className="card-img-top" alt="..."/>
			</NavLink>
				<div className="card-body">
					<h5 className="card-title">{props.fullName}</h5>
					<p className="card-text">{props.status}</p>
				</div>
			<div className="card-footer">
				<small className="text-muted">Online</small>
			</div>
		</div>
	</div>)
}

const Friends = (props) => {

	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

	let pages = [];
	for(let i = 0; i < pagesCount; i++) {
		pages.push(i+1);
	}

	let FriendsItems = props.users.map((u, i) => {
		if (i != 1)
			return (<FriendItem {...u} index={i}/>);
		return (<div>
			{ props.isFetching ? <Preloader /> : <FriendItem {...u} index={i}/>} 
			</div>);
	});

	return (<section className={'container-md mt-3'}>
			<Pagination pages={pages} onPageChange={props.onPageChange} currentPage={props.currentPage}/>
			{ props.isFetching && pagesCount < 1 ? <Preloader /> : null} 
			<div className={'text-center w720 mx-auto row row-cols-1 row-cols-md-3 g-4'}>
				{ FriendsItems }
			</div>
		</section>)
}

export default Friends;
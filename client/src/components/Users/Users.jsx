import styles from './Users.module.css';
import * as axios from 'axios';
import {NavLink} from 'react-router-dom';
import noImage from '../../assets/images/noimage.png';

const Users = (props) => {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

	let pages = [];
	for(let i = 0; i < pagesCount; i++) {
		pages.push(i+1);
	}

	return (
		<div>
			<div>
				{ pages.map( p => {
					return (<span className={props.currentPage === p ? styles.selectedPage : ""} 
						onClick={ (e) => { props.onPageChange(p); }}>{p}</span>);
				})}
			</div>
			{
				props.users.map(u => <div key={u.userId}>
					<span>
						<div>
							<NavLink to={`/profile/${u.userId}`}><img src={u.photos.small ? u.photos.small : noImage} alt="#" height="64px" width="64px"/></NavLink>
						</div>
						<div>
							{u.followed
								? <button onClick={() => props.unfollow(u.userId)} >UNFOLLOW</button> 
								: <button onClick={() => props.follow(u.userId)} >FOLLOW</button>
							}
						</div>
					</span>
					<span>
						<div>{u.location}</div>
						<div>{u.fullName}</div>
						<div>{u.status}</div>
						<div>{u.userId}</div>
					</span>
				</div>)
			}
		</div>);
}

export default Users;
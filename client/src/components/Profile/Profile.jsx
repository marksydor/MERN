import React from 'react';
import s from './Profile.module.css';
import noImage from '../../assets/images/noimage.png';
import AddPost from '../common/AddPost.js';

import { AiOutlineUserAdd, AiOutlineMessage } from 'react-icons/ai';

const Item = (props) => {
	return (
		<div>
			<li className={props.className ? props.className : 'list-group-item'} {...props}>
				{ props.item }
			</li>
		</div>)
}

const ListInfoItem = (props) => {	
	const ContactsItems = props.items.map((i, index) => <Item 
		item={i} index={index} key={index}/>);

	return (
		<div className={'card mt-3'}>
			<div className={'card-header list-group-item list-group-item-primary'}> {props.name} </div>
			<ul className={'list-group list-group-flush'}>
				<div className={`scroll`}>
					{ ContactsItems }
				</div>		
			</ul>
		</div>
		)
}

const ProfilePhoto = (props) => {
	return (
		<div className={'card'}>
			<img src={props.Src ? props.Src : noImage} className={'card-img-top ' + s.avatar} alt={'...'}/>
				<div className={'card-body'}>
					<p className={'card-text'}>{props.visableInfo}</p>
				</div>
		</div>)
}



const Profile = (props) => {
	return (<>{props.profile && 
		<section className={'container-md'}>
			<div className={'card border-dark mt-3 ' + s.profileForm}>
				<div className={'card-header list-group-item list-group-item-success'}>{props.profile.fullName}<span className={'float-end'}>kk</span>
				</div>
				<div className={'card-body text-dark'}>
					<div className={'row'}>
						<div className={'col-sm-6'}>
							<ProfilePhoto 
								Src={props.profile.avatar}
								visableInfo={props.profile.status}
							/>
							<div className={'card px-1 mt-1'}>
								<button type="button" class="btn btn-success my-1">Add Friend<AiOutlineUserAdd /></button>
								<button type="button" class="btn btn-primary my-1">Send Message <AiOutlineMessage /></button>

							</div>
						</div>
						<div className={'col-sm-6'}>
							<ListInfoItem items={props.profile.about} name={'About me'}/>
							<ListInfoItem items={props.profile.contacts} name={'Contacts'}/>
						</div>
					</div>
				</div>
			</div>
		</section>}</>);
}

export default Profile;
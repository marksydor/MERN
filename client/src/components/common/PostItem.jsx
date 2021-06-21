import React from 'react';
import s from './styles.module.css';
import { FcLikePlaceholder } from 'react-icons/fc';
import { GoCommentDiscussion } from 'react-icons/go';
import { BiMailSend } from 'react-icons/bi';
import noImage from '../../assets/images/noimage.png';

const PostItem = (props) => {
	return (
		<div className={"card text-center w720 mx-auto mt-2"}>
			<div className={"card-header text-start"}>
				<img src={props.avatar ? props.avatar : noImage} alt={"avatar"} className={s.avatar + " rounded"} />
				<span className={"m-2 fs-4"} >{props.userName}</span>
			</div>
			<div className={"card-body"}>
				{props.img && <img src={props.img}
					alt={"post"} className={s.newItemImg + " rounded"}/>
				}					
				<p className={"card-text text-start"}>{props.text}</p>
			</div>
			<div className={"card-footer text-muted text-start"}>
				<div className={"float-start fs-6 mt-3"}>{props.date.substr(0, 10)}</div>
				<div className={"float-end"}>
					<button className={"btn fs-4"}> <BiMailSend /> </button>
					<button className={"btn fs-4"}> <span className={"fs-5 me-1"}>{props.commentsCount}</span><GoCommentDiscussion /> </button>
					<button className={"btn fs-4"}> <span className={"fs-5 me-1"}>{props.likesCount}</span> <FcLikePlaceholder /> </button>
					</div>
			</div>
		</div>);
}

export default PostItem;
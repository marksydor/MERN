import React from 'react';
import s from './styles.module.css';
import { RiImageAddLine } from 'react-icons/ri';
import { AiOutlineSend,  AiOutlineDelete } from 'react-icons/ai';


const AddPost = (props) => {

	return (
		<div className={"card border-dark text-center w720 mx-auto mt-2"}>
			<div className={"card-header"}>
				What's new?
			</div>
			<div className={"card-body"}>
				<img src={props.newsItemImg}
					alt={"post"} className={"float-start rounded " + s.avatar}/>
				<textarea name="" id="" className={"form-control float-end " + s.textareaItem}  placeholder={'type something new'}/>
			</div>
			<div className={"card-footer text-muted text-end"}>
				<button type="button" class="btn btn-secondary mx-1">Add Image <RiImageAddLine /></button>
				<button type="button" class="btn btn-danger mx-1">Delete <AiOutlineDelete /></button>
				<button type="button" class="btn btn-success mx-1">Publish <AiOutlineSend /></button>
			</div>
		</div>);
}

export default AddPost;
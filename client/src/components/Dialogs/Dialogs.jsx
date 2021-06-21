import React from 'react';
import styles from "./Dialogs.module.css";
import {NavLink, Redirect} from 'react-router-dom';

let newMessTextElement = React.createRef();

const DialogItem = (props) => {
	return (<div className = { styles.dialogItem }>
			<NavLink to={'/dialogs/' +  props.to } id={props.id} key={props.id}>{ props.name }</NavLink>
		</div>);
}

const Message = (props) => {
	return (<div className = {styles.mess} id={props.id} key={props.id}>
		 {props.mess}
	</div>)
}

const Dialogs = (props) => {
	if (!props.auth)
		return(<Redirect to={'/login'}/>);
	let dialogsItems = props.dialogsPage.dialogs.map (d => <DialogItem id={d.id} name={d.name} to={d.to} />);
	let messagesItems = props.dialogsPage.messages.map (m => <Message id={m.id} mess={m.mess} />);
	return (<div className = { styles.dialogs } >
			<div className = { styles.dialogsItems } >
				{ dialogsItems }
			</div>
			<div className = {styles.messages} >
				{ messagesItems }
			</div>
			<div className = { styles.textarea }>
				<textarea 
				name="" id="" cols="30" rows="10" placeholder="напиши щось сюди" 
				ref = { newMessTextElement } onChange = { () => props.updateNewMessText(newMessTextElement.current.value) } value = { props.dialogsPage.currentMess } />
				<button name="send" onClick = { () => props.sendMessage() } >send</button>
			</div>	
		</div>);
}

export default Dialogs
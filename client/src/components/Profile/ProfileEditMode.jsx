import React, { useState } from 'react';
import s from './Profile.module.css';
import noImage from '../../assets/images/noimage.png';


const ProfilePhoto = (props) => {
	const [editMod, setEditMod] = useState(false);
	const [info, setInfo] = useState(props.Info);
	const [visableInfo, setVisableInfo] = useState(props.Info);

	const activateEditMode = () => {
		setEditMod(true)
	}

	const changeInfo = (e) => {
		setInfo(e.currentTarget.value);
	}

	const saveChange = () => {
		setVisableInfo(info);
		setEditMod(false)
	}

	const cancelChange = () => {
		setInfo(visableInfo);
		setEditMod(false)
	}

	return (
		<div className={'card'}>
			<img src={props.Src ? props.Src : noImage} className={'card-img-top ' + s.avatar} alt={'...'}/>
			{ !editMod &&
				<div className={'card-body'} onClick={activateEditMode}>
					<p className={'card-text'}>{visableInfo}</p>
				</div>
			}
			{ editMod &&
				<div className="form-floating">
					<textarea className={"form-control"} onChange={changeInfo} id="floatingTextarea2" value={info}/>
					<label htmlFor="floatingTextarea2">Status</label>
					<div className="btn-group p-1 w-100" role="group">
						<button type="button" onClick={saveChange} className="btn btn-success btn-sm mt-1">Save</button>
						<button type="button" onClick={cancelChange} className="btn btn-danger btn-sm mt-1">Delete</button>
					</div>
				</div>
			}
		</div>)
}

const Item = ({removeItem, editMod, editItem, ...props}) => {
	const [editMode, setEditMod] = useState(false);
	const [record, setRecord] = useState(props.item);
	const [visableRecord, setVisableRecord] = useState(props.item);

	const onClickRemove = () => {
		removeItem(props.index);
	}

	const activateEditMode = () => {
		setEditMod(true);
	}

	const changeRecord = (e) => {
		setRecord(e.currentTarget.value);
	}

	const changeItem = () => {
		editItem(props.index, record);
		setEditMod(false);
	}

	const cancelChange = () => {
		setRecord(visableRecord);
		setEditMod(false);
	}

	const saveChange = () => {
		setVisableRecord(record);
		setEditMod(false);
	}

	return (
		<div>
		{ !editMod &&
			<li className={props.className ? props.className : 'list-group-item'} {...props}>
			{visableRecord}
			</li>
		}
		{ editMod && 
			<li className={props.className ? props.className : 'list-group-item'} >
				{editMod && <button onClick={onClickRemove} type="button" className={"btn-close"} aria-label="Close"></button>}
				<span onClick={activateEditMode} {...props}>
				{visableRecord + ' --> ' + props.index} 
				</span>
			</li>

		}
		{ (editMode && editMod) &&
			<div className="form-floating m-2">
				<input onChange={changeRecord} type="text" className="form-control" id="floatingInputValue" value={record} />
				<label htmlFor="floatingInputValue">Додати запис</label>
				<div className="btn-group p-1 w-100" role="group">
					<button type="button" onClick={saveChange} className="btn btn-success btn-sm mt-1">Зберегти</button>
					<button type="button" onClick={cancelChange} className="btn btn-danger btn-sm mt-1">Відхилити</button>
				</div>
			</div>
		}</div>)
}

const ListInfoItem = (props) => {
	const [editMod, setEditMod] = useState(false);
	const [items, setItems] = useState(props.items);
	const [record, setRecord] = useState('');
	
	const activateEditMode = () => {
		setEditMod(true)
	}

	const DeActivateEditMode = () => {
		setEditMod(false)
	}

	const changeRecord = (e) => {
		setRecord(e.currentTarget.value)
	}

	const removeItem = (itemIndex) => {
		const copyItems = [...items];
		const newItems = copyItems.map((item, i) => {
			if (i != itemIndex)
				return (item)
		})
		copyItems.splice(parseInt(itemIndex), 1);

		setItems(copyItems);
	}

	const addRecord = () => {
		const copyItems = [...items];
		copyItems.push(record);
		setItems(copyItems);
		setRecord('');
	}

	const editItem = (itemIndex, itemText) => {
		const copyItems = items.map((i, index) => {
			if (index == itemIndex)
				return (itemText)
			return (i);
		})
		setItems(copyItems);
	}

	const ContactsItems = items.map((i, index) => <Item 
		item={i} editMod={false} index={index} key={index}/>);
	const ContactsItemsEdit = items.map((i, index) => <Item 
		item={i} editMod={true} index={index} key={index} removeItem={removeItem} editItem={editItem}/>);

	return (
		<div className={'card mt-3'}>
			{ !editMod && <div onClick={ activateEditMode } className={'card-header list-group-item list-group-item-primary'}> {props.name} </div> }
			{ editMod && <div className={'card-header list-group-item list-group-item-primary'}> {props.name} </div> }
			<ul className={'list-group list-group-flush'}>
			{ editMod &&
				<div className="btn-group p-1" role="group">
					<button type="button" onClick={ DeActivateEditMode } className={"btn btn-outline-success"}>Зберегти</button>
					<button type="button" onClick={ DeActivateEditMode } className={"btn btn-danger"}>Відмінити</button>
				</div>
			}
			{ editMod &&
				<div className="form-floating m-2">
					<input onChange={changeRecord} type="text" className="form-control" id="floatingInputValue" value={record} />
					<label htmlFor="floatingInputValue">Додати запис</label>
					<button type="button" onClick={addRecord} className="btn btn-primary btn-sm mt-1">Зберегти</button>
				</div>
			}
			<div className={`scroll`}>
					{!editMod && ContactsItems }
					{editMod && ContactsItemsEdit}
			</div>		
			</ul>
		</div>
		)
}


const Profile = (props) => {
	let tempContac = ['email: example@mail','Facebook: https://www.facebook.com/profile.php?id=100017193738856','Instagram: https://www.instagram.com/bovictoriya/'];

	return (<>{props.profile && <section className={'container-md'}>
			<div className={'card border-dark mt-3 ' + s.profileForm}>
				<div className={'card-header list-group-item list-group-item-success'}>Богач Вікторія Антоліївна<span className={'float-end'}>kk</span>
				</div>
				<div className={'card-body text-dark'}>
					<div className={'row'}>
						<div className={'col-sm-6'}>
							<ProfilePhoto 
								Src={props.profile.avatar}
								Info={props.profile.status}
							/>
						</div>
						<div className={'col-sm-6'}>
							<ListInfoItem items={props.profile.about} name={'About me'}/>
							<ListInfoItem items={props.profile.contacts} name={'Contacts'}/>
						</div>
					</div>
				</div>
			</div>
		</section>}</>)
}

export default Profile;
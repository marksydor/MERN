const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
	dialogs: [{id: 1, name: 'Тарас', to: '1'},
		{id: 2, name: 'Леся', to: '2'},
		{id: 3, name: 'Василь', to: '3'},
		{id: 4, name: 'Жора', to: '4'}],
	messages: [{id: 1, mess: 'Кохайтеся Чорнобриві', from: 'Тарас'},
		{id: 2, mess: 'Всі-жінки коли вони кохають', from: 'Леся'},
		{id: 3, mess: 'Я добре те що смерті не боюсь я', from: 'Василь'},
		{id: 4, mess: 'Люов виникає з любові', from: 'Жора'}],
	currentMess: ''
}

const dialogsReducer = (state = initialState, action) => {
	let stateCopy = {...state};
	switch (action.type) {
		case SEND_MESSAGE:
			let newMess = {
				id: 5,
				mess: state.currentMess,
				from: 'me'
			}
			stateCopy = {
				...state,
				messages: [...state.messages],
				currentMess: ''
			}
			stateCopy.messages.push(newMess);
			return stateCopy;
		case UPDATE_NEW_MESSAGE_TEXT:
			stateCopy = {
				...state,
				currentMess: action.message
			}
			return (stateCopy);
		default:
			return (state);
	}
}

export const sendMessActionCreator = () => {
	return ({type: SEND_MESSAGE});
}

export const updateNewMessTextActionCreator = (text) => {
	return ({type: UPDATE_NEW_MESSAGE_TEXT, message: text});
}

export default dialogsReducer;
import {sendMessActionCreator, updateNewMessTextActionCreator} from '../../redux/dialogs-reducer.js';
import Dialogs from './Dialogs.jsx';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return ({
		dialogsPage: state.dialogsPage,
		auth: state.auth.auth
	})
}

const mamDispatchToProps = (dispatch) => {
	return {
		updateNewMessText: (text) => {
			return dispatch(updateNewMessTextActionCreator(text));
		},
		sendMessage: () => {
			return dispatch(sendMessActionCreator());
		}
	}
}

const DialogsContainer = connect(mapStateToProps, mamDispatchToProps)(Dialogs);


export default DialogsContainer;
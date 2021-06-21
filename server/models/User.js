const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
	firstName: {type: String},
	lastName: {type: String},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	photoURL: {type: String, default: null},
	about: {type: Array, default: null},
	contacts: {type: Array, default: null},
	userId: {type: Types.ObjectId},
	status: {type: String, default: null},
	confirmedMail: {type: Boolean, default: false},
	key: {type: String}
});

module.exports = model('User', schema);

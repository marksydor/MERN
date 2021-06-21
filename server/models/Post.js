const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
	author_id: {type: String, required: true},
	post_id: {type: Types.ObjectId},
	text: {type: String},
	photoURL: {type: String},
	date: {type: Date, default: Date.now()}
});

module.exports = model('Post', schema);

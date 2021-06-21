const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
	firstUserId: {type: String, required: true},
	secondUserId: {type: String},
	eventType: {type: String, required: true},
	date: {type: Date, default: Date.now()},
	eventId: {type: Types.ObjectId}
});

module.exports = model('Event', schema);
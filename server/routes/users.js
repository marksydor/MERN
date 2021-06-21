const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.get('/', async (req, res) => {
	try {
		let page = req.query.page || 1;
		let count = parseInt(req.query.count || 5);
		count = count > 100 ? 100 : count;
		let temp = await User.find({}, {password: 0, __v: 0}).skip((page-1) * count).limit(count);
		let dataToSend = temp.map(u => {
			return ({
				fullName: `${u._doc.firstName} ${u._doc.lastName}`,
				userId: u._doc._id,
				status: u._doc.status,
				avatar: u._doc.avatar
			});
		})
		res.header("Access-Control-Allow-Origin", "*");
		res.status(200).json({users: dataToSend, total: await User.find().countDocuments()});
	} catch (e) {
		console.log(e);
		res.status(500).json({mess: "something wrong"})
	}
});

module.exports = router;
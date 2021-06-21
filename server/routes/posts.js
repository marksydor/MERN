const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
const User = require('../models/User.js');

router.get('/', async (req, res) => {
	try {
		let page = req.query.page || 1;
		let count = parseInt(req.query.count || 5);
		count = count > 100 ? 100 : count;
		let temp = await Post.find({}, {password: 0, __v: 0}).skip((page-1) * count).limit(count);

		const prepareData = async (u) => {
			let user = await User.findById(u.author_id);
			return ({
				userName: `${user._doc.firstName} ${user._doc.lastName}`,
				avatar: user._doc.avatar,
				author_id: u.author_id,
				post_id: u.email,
				text: u.text,
				photoURL: u.photoURL,
				date: u.date,
			});
		}
		
		const dataToSend = await Promise.all(temp.map(async (u) => {
			return (await prepareData(u));
			}))
		res.header("Access-Control-Allow-Origin", "*");
		res.status(200).json({posts: dataToSend, total: await Post.find().countDocuments()});
	} catch (e) {
		console.log(e);
		res.status(500).json({mess: "something wrong"})
	}
});

// router.get('/:postId', async (req, res) => {
// 	try {
// 		res.header('Access-Control-Allow-Origin', '*');
// 		let userId = req.params.userId || null;
// 		if (!userId) {
// 			res.status(404).send('can not find this user');
// 			return;
// 		}
// 		let temp = await User.findById(userId, (e) => {
// 			if (e)
// 				return res.status(404).send('can not find this user ' + e);
// 		});

// 		let dataToSend = {
// 			fullName: `${temp._doc.firstName} ${temp._doc.lastName}`,
// 			id: temp._doc._id,
// 			email: temp._doc.email,
// 			status: temp._doc.status,
// 			about: temp._doc.about,
// 			contacts: temp._doc.contacts,
// 			avatar: temp._doc.photoURL
// 		}
// 		if (dataToSend === undefined) {
// 			return res.status(404).send('can not find this user ' + e);
// 		}
// 		res.status(200).json(dataToSend);
// 	} catch (e) {
// 		console.log(e);
// 		res.status(500).json({mess: 'something wrong'})
// 	}
// });



router.post('/', async (req, res) => {
	try {
		const {text, photoURL, date, author_id} = req.body;

		if (await User.exists({ author_id })) {
			return res.status(400).json({ mess: 'this user is not exist'});
		}

		if (text.length > 0 || photoURL) {
			let post = new Post({text, photoURL, date, author_id});
			post.save();
		}

		res.stutus(200).json({mess: "post created"});
	} catch (e) {
		console.log(e);
		res.status(500).json({mess: "something wrong"})
	}
})

module.exports = router;
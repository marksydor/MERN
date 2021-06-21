const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

router.post('/create',
	[
		check('email', 'bad mail').isEmail(),
		check('password', 'bad password').isLength({min: 6, max: 24}),
		check('firstName', 'bad firstName').isLength({min: 2, max: 24}),
		check('lastName', 'bad lastName').isLength({min: 2, max: 24})
	],
	async (req, res) => {
	try {
		res.header('Access-Control-Allow-Origin', '*');

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				mess: 'not correct data'
			})
		}

		const {firstName, lastName, email, password} = req.body;


		if (await User.exists({ email })) {
			return res.status(400).json({ mess: 'this user is already exist'});
		}
		const saltRounds = 10;
		bcrypt.hash(password, saltRounds, async (err, hash) => {
			const user = new User({email, password: hash, firstName, lastName});
			await user.save();
			res.status(201).json({mess: 'user created'});
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({mess: 'something wrong'});
	}
});

router.put('/update/:userId',
	[
		check('email', 'bad mail').isEmail(),
		check('firstName', 'bad firstName').isLength({min: 2, max: 24}),
		check('lastName', 'bad lastName').isLength({min: 2, max: 24}),
		check('status', 'bad status').isLength({min: 2, max: 256}),
	],
	async (req, res) => {
	try {
		res.header('Access-Control-Allow-Origin', '*');

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				mess: 'not correct data'
			})
		}

		const {firstName, lastName, email, status, photoURL, about, contacts} = req.body;
		const userId = req.params.userId

		if (await User.exists({ email })) {
			return res.status(400).json({ mess: 'this user is already exist'});
		}

		const user = User.findByIdAndUpdate(userId, {firstName, lastName, email, status, photoURL, about, contacts}, (e) => {
			if (e) {
				return res.status(404).send('can not find this user: ' + e);
			}
		})
		await user.save();

		res.status(204).json({mess: 'user updated'});

	} catch (e) {
		console.log(e);
		res.status(500).json({mess: 'something wrong'});
	}
});

router.get('/:userId', async (req, res) => {
	try {
		res.header('Access-Control-Allow-Origin', '*');
		let userId = req.params.userId || null;
		if (!userId) {
			res.status(404).send('can not find this user');
			return;
		}
		let temp = await User.findById(userId, (e) => {
			if (e)
				return res.status(404).send('can not find this user ' + e);
		});

		let dataToSend = {
			fullName: `${temp._doc.firstName} ${temp._doc.lastName}`,
			id: temp._doc._id,
			email: temp._doc.email,
			status: temp._doc.status,
			about: temp._doc.about,
			contacts: temp._doc.contacts,
			avatar: temp._doc.photoURL
		}
		if (dataToSend === undefined) {
			return res.status(404).send('can not find this user ' + e);
		}
		res.status(200).json(dataToSend);
	} catch (e) {
		console.log(e);
		res.status(500).json({mess: 'something wrong'})
	}
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/config.js');
const dataVireficator = require('../my_modules/dataVerification.js');
const crypto = require('crypto');
const sendMail = require('../my_modules/sendMail.js');

router.post('/signup', async (req, res) => {
	try {
		const {email, password, confirmPassword} = req.body;
		return (console.log({email, password, confirmPassword}));
		let user = await User.findOne({email: email});
		if (user) {
			return res.status(409).json({mess: 'this users already exists'}); 
		}
		if (password != confirmPassword) {
			return res.status(401).json({mess: 'password not match'});
		}
		if (!dataVerificator('password', 'hard', password)) {
			return res.status(400).json({mess: 'password must contain A-Z a-z 0-9 !#%^&*+ but no <>${}()'});
		}
		if (!dataVerificator('mail', 'hard', email)) {
			return res.status(400).json({mess: 'bad mail'});
		}
		const saltRounds = 10;
		bcrypt.hash(password + '1039C649C3C5D1', saltRounds, async (err, hash) => {
			let key = await crypto.createHash('sha512').update(email + sault + Math.random().toString(36).substring(12)).digest('hex');
			let url = req.protocol + '://' + req.get('host') + '/api/auth/confirm?key=' + key;
			const user = new User({email, password: hash, key});
			await user.save();
			res.status(201).json({mess: 'plese verify your mail'});
			sendMail(email, 'confirm password', 'plese go to this link to confirm your password'  + url + key)
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({mess: 'something wrong'});
	}
});

// router.get('/changepasword', async(req, res) => {
	// 
// })

router.get('/confirm', async (req, res) => {
	try {
		if (!req.query.key) {
			return res.status(400).json({mess: 'bad key'});
		} 
		let user = await User.findOne({key: key});
		if (!user) {
			return res.status(400).json({mess: 'bad key'});
		} 
		user.key = null;
		user.confirmed = true;
		await user.save();
		res.status(201).json({mess: 'email confirmed'});
	} catch (e) {
		console.log(e);
		res.status(500).json({mess: 'something wrong'});
	}

});

router.post('/forgot', async (req, res) => {
	try {
		const {email} = req.body;
		let user = await User.findOne({email: email});
		if (!req.query.key) {
			return res.status(400).json({mess: 'bad mail'});
		} 
		let key = await crypto.createHash('sha512').update(email + sault + Math.random().toString(36).substring(12)).digest('hex');
		let url = req.protocol + '://' + req.get('host') + '/api/auth/confirm?key=' + key;
		user.key = key;
		await user.save();
		res.status(201).json({mess: 'plese verify your mail'});
		sendMail(email, 'confirm password', 'plese go to this link to change your password ' + url + key)
	} catch (e) {
		console.log(e);
		res.status(500).json({mess: 'something wrong'});
	}
});

router.post('/confirmforgoten', async (req, res) => {
	const {email, password, confirmPassword, key} = req.body;
	let user = await User.findOne({email: email, key});
	if (!user) {
		return res.status(400).json({mess: 'bad mail or key'});
	}
	if (password != confirmPassword) {
		return res.status(401).json({mess: 'password not match'});
	}
	if (!dataVerificator('password', 'hard', password)) {
		return res.status(400).json({mess: 'password must contain A-Z a-z 0-9 !#%^&*+ but no <>${}()'});
	}
	bcrypt.hash(password, saltRounds, async (err, hash) => {
		user.key = null;
		user.password = hash;		
		// const user = new User({email, password: hash, key});
		await user.save();
		res.status(201).json({mess: 'plese verify your mail'});
	});
});

router.post('/signin', async (req, res) => {
	try {
		const {email, password} = req.body;
		// let user = await User.findOne({email: email});
		// if (!user) {
		// 	return res.status(404).json({mess: 'user not found'}); 
		// }

		// if (!await bcrypt.compare(password + '1039C649C3C5D1', user.password)) {
		// 	return res.status(401).json({mess: 'password not match'}); 
		// }
		// console.log('here')
		// return res.status(400).send('password must contain A-Z a-z 0-9 !#%^&*+ but no <>${}()');

		const user = {
			userId: '123325432',
			email: email,
			firstName: 'jacob',
			lastName: 'trimo'
		}

		let token = jwt.sign({userId: user.userId}, jwtSecret, {
			expiresIn: 86400
		});

		res.cookie('token', token, { httpOnly: true });


		res.json({token, email: user.email, fullName: `${user.firstName} ${user.lastName}`});
		// return res.status(200).json({auth: true, token, 
		// 	user: {email: user.email, fullName: `${user.firstName} ${user.lastName}`, userId: user._id}});
	} catch (e) {
		console.log(e);
		res.status(500).json({mess: 'something wrong'});
	}
});

router.delete('/signin', async (req, res) => {
	console.log('do something');
	res.status(200).send();
})

router.get('/me', async (req, res) => {
	try {
		let token = req.headers['x-access-token'];
		if (!token) {
			return res.status(401).json({ auth: false, message: 'No token provided.' });
		}
		
		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) {
				console.log(err);
				return res.status(200).json({ auth: false, message: 'Failed to authenticate token.' });
			}
			res.status(200).json({data: decoded, auth:true});
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({mess: 'something wrong'});
	}
	
});

router.get('/logout', async (req, res) => {
	res.status(200).send({ auth: false, token: null });
})

module.exports = router;
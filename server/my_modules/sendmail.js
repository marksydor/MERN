const transporter = require('../config/config.js');

module.exports.sendMail = async (to, subject, text, html = text) => {
	let result = await transporter.sendMail({
		from: 'Association of Cyber ​​Security Specialists',
		to: to,
		subject: subject,
		text: text,
		html: html
	});

	console.log(result);
}
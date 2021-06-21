module.exports.transporter = require('nodemailer').createTransport({
	service: 'gmail',
	auth: {
	  user: 'mark.sydor.i@gmail.com',
	  pass: 'imisez17',
	},
})

module.exports.jwtSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

module.exports.dataBaseURL = 'mongodb+srv://msydor:1234qwer@cluster0.6v0ic.mongodb.net/apiApp?retryWrites=true&w=majority';
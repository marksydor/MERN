const express = 		require('express');
const app = 				express();
const jsonParser = 	express.json();


const bcrypt = 		require('bcryptjs');
const mongoose = 	require('mongoose');
const User = 			require('./models/User.js');
const cors = 			require('cors');
const crypto = 		require("crypto");

const port = process.env.PORT || 5000;

		
const dataVireficator = require('./my_modules/dataVerification.js');

const startDataBaseConection = async () => {
	try {
		await mongoose.connect('mongodb+srv://msydor:1234qwer@cluster0.6v0ic.mongodb.net/apiApp?retryWrites=true&w=majority', {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false });
		console.log('MongoDB connected');
	} catch (e) {
		console.log('Server error:' + e);
		procces.exit(1);
	}
}

startDataBaseConection();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', require('./routes/users.js'));
app.use('/api/profile', require('./routes/profile.js'));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/posts', require('./routes/posts.js'));

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})


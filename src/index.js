const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
import passport from 'passport';
const config = require('./db');

const users = require('./routes/user'); 

if(config.useMongo) {
	mongoose.connect(config.mongo.dbUrl, { useNewUrlParser: true }).then(
		() => {console.log('Database is connected'); },
		err => { console.log('Can not connect to the database'+ err); }
	);
}
if(config.useSql){
	var Sequelize = require('sequelize');
	var sequelize = new Sequelize(config.sql.db,{define: {
		timestamps: false
	}});
	sequelize
		.authenticate()
		.then(() => {
			console.log('Connection has been established successfully.');
		})
		.catch(err => {
			console.error('Unable to connect to the database:', err);
		});
}

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

// REGISTER OUR ROUTES -------------------------------
require('./routes/api').default(app);

app.get('/', function(req, res) {
	res.send('hello');
});

app.use(express.static('./../uploads/themes/'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});

export default app;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./db');


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
app.use((req, res, next) => {
	if (process.env.NODE_ENV == 'development') {
		res.header('Cache-Control',
			'private, no-cache, no-store, must-revalidate');
		res.header('Expires', '-1');
		res.header('Pragma', 'no-cache');
	}
	res.header('Access-Control-Allow-METHODS',
		'GET,PUT,POST,DELETE,HEAD,OPTIONS');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers',
		'X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, Origin, x-requested-with, Content-Type, Content-Range, Content-Disposition, Content-Description');
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// REGISTER OUR ROUTES -------------------------------
require('./routes').default(app);

app.get('/', function(req, res) {
	res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});

export default app;
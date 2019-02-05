'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var config = require('./db');

var users = require('./routes/user');

if (config.useMongo) {
	mongoose.connect(config.mongo.dbUrl, { useNewUrlParser: true }).then(function () {
		console.log('Database is connected');
	}, function (err) {
		console.log('Can not connect to the database' + err);
	});
}
if (config.useSql) {
	var Sequelize = require('sequelize');
	var sequelize = new Sequelize(config.sql.db, { define: {
			timestamps: false
		} });
	sequelize.authenticate().then(function () {
		console.log('Connection has been established successfully.');
	}).catch(function (err) {
		console.error('Unable to connect to the database:', err);
	});
}

var app = express();
app.use(_passport2.default.initialize());
require('./passport')(_passport2.default);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

// REGISTER OUR ROUTES -------------------------------
require('./routes/api').default(app);

app.get('/', function (req, res) {
	res.send('hello');
});

app.use(express.static('./uploads/themes/'));
var PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
	console.log('Server is running on PORT ' + PORT);
});

exports.default = app;
//# sourceMappingURL=index.js.map
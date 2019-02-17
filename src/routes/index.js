/**
 * Main application routes
**/
const baseAPI = '/api';
const config = require('./../db');

exports.default = function(app) {

	if(config.useMongo){
		app.use(baseAPI+'/users', require('../api/authentication/users-mongo'));
	}else{
		app.use(baseAPI+'/users', require('../api/authentication/users-sequelize'));
	}
	app.use(baseAPI+'/themes', require('../api/theme'));
	app.use(baseAPI+'/categories', require('../api/category'));
	app.use(baseAPI+'/kits', require('../api/kit'));
	app.use(baseAPI+'/products', require('../api/product'));
	
	// LASTLINE

};
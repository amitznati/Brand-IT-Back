/**
 * Main application routes
**/
const baseAPI = '/api';
exports.default = function(app) {


	app.use(baseAPI+'/themes', require('../api/themes'));
	app.use(baseAPI+'/categories', require('../api/categories'));
	app.use(baseAPI+'/products', require('../api/products'));
	app.use(baseAPI+'/kits', require('../api/kits'));
	// LASTLINE

};
/**
 * Main application routes
**/
const baseAPI = '/api';
exports.default = function(app) {


	app.use(baseAPI+'/categories', require('../api/category'));
	app.use(baseAPI+'/kits', require('../api/kit'));
	// LASTLINE

};
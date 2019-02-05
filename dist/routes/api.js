'use strict';

/**
 * Main application routes
**/
var baseAPI = '/api';
exports.default = function (app) {

	app.use(baseAPI + '/themes', require('../api/theme'));
	app.use(baseAPI + '/categories', require('../api/category'));
	app.use(baseAPI + '/kits', require('../api/kit'));
	app.use(baseAPI + '/products', require('../api/product'));
	// LASTLINE
};
//# sourceMappingURL=api.js.map
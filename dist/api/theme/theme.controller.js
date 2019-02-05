'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Using Rails-like standard naming convention for endpoints.
 * POST	/theme				 ->	create
 * GET	 /theme				 ->	getAll
 * GET	 /theme /:id			->	getByID
 * DELETE	/theme /:id			->	removeByID
 * PATCH	 /theme /:id			->	updateByID
 */

//const _ = require('lodash');
//const {ObjectID} = require('mongodb');
var GLOBAL_RESPONSES = require('../global/responses');
var LOCAL_RESPONSES = require('./responses');

var _require = require('./../sequelize'),
    Theme = _require.Theme;

exports.create = function (req, res) {
	var ModelInstance = Theme;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.create(_extends({}, req.body)).then(function (theme) {
			var resultResponse = GLOBAL_RESPONSES.CREATE_SUCCESS;
			resultResponse.resourceId = theme.dataValues.id;
			res.json({ resultResponse: resultResponse });
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.getAll = function (req, res) {
	var ModelInstance = Theme;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.findAll({
			limit: 40
		}).then(function (theme_result) {
			if (!theme_result || theme_result && theme_result.length == 0) {
				res.json(LOCAL_RESPONSES.THEME_NOT_FOUND);
			}
			res.json(theme_result);
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.getByID = function (req, res) {
	var ModelInstance = Theme;
	// force: true will drop the table if it already exists
	ModelInstance.sync().then(function () {
		// Table created
		return Theme.findOne({
			where: {
				id: req.params.theme_id
			}
		}).then(function (theme) {
			if (!theme) {
				res.json(LOCAL_RESPONSES.PRODUCT_NOT_FOUND);
			}
			res.json(theme);
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.removeByID = function (req, res) {
	var ModelInstance = Theme;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.destroy({
			where: {
				id: req.params.theme_id
			}
		}).then(function () /*results*/{
			res.json(GLOBAL_RESPONSES.DELETE_SUCCESS);
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.updateByID = function (req, res) {
	var ModelInstance = Theme;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		ModelInstance.find({ where: { id: req.params.theme_id } }).then(function (model) {
			// Check if record exists in db
			if (model) {
				model.updateAttributes(_extends({}, req.body)).then(function () {
					res.json(GLOBAL_RESPONSES.UPDATE_SUCCESS);
				}).catch(function (err) {
					res.send(err);
				});
			}
		}).catch(function () /*err*/{
			res.send(LOCAL_RESPONSES.THEME_NOT_FOUND);
		});
	});
};
//# sourceMappingURL=theme.controller.js.map
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Using Rails-like standard naming convention for endpoints.
 * POST	/kit				 ->	create
 * GET	 /kit				 ->	getAll
 * GET	 /kit /:id			->	getByID
 * DELETE	/kit /:id			->	removeByID
 * PATCH	 /kit /:id			->	updateByID
 */

//const _ = require('lodash');
//const {ObjectID} = require('mongodb');
var GLOBAL_RESPONSES = require('../global/responses');
var LOCAL_RESPONSES = require('./responses');

var _require = require('./../sequelize'),
    Kit = _require.Kit,
    Category = _require.Category,
    Product = _require.Product;

exports.create = function (req, res) {
	var ModelInstance = Kit;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.create(_extends({}, req.body)).then(function (kit) {
			var resultResponse = GLOBAL_RESPONSES.CREATE_SUCCESS;
			resultResponse.resourceId = kit.dataValues.id;
			res.json({ resultResponse: resultResponse });
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.getAll = function (req, res) {
	var ModelInstance = Kit;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.findAll({
			limit: 40
		}).then(function (kit_result) {
			if (!kit_result || kit_result && kit_result.length == 0) {
				res.json(LOCAL_RESPONSES.KIT_NOT_FOUND);
			}
			res.json(kit_result);
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.getByID = function (req, res) {
	var ModelInstance = Kit;
	// force: true will drop the table if it already exists
	ModelInstance.sync().then(function () {
		// Table created
		return Kit.findOne({
			include: [Category, { model: Product, through: { attributes: [] } }],
			where: {
				id: req.params.kit_id
			},
			attributes: ['id', 'name']
		}).then(function (kit) {
			if (!kit) {
				res.json(LOCAL_RESPONSES.PRODUCT_NOT_FOUND);
			}
			res.json(kit);
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.removeByID = function (req, res) {
	var ModelInstance = Kit;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.destroy({
			where: {
				id: req.params.kit_id
			}
		}).then(function () /*results*/{
			res.json(GLOBAL_RESPONSES.DELETE_SUCCESS);
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.updateByID = function (req, res) {
	var ModelInstance = Kit;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		ModelInstance.find({ where: { id: req.params.kit_id } }).then(function (model) {
			// Check if record exists in db
			if (model) {
				model.updateAttributes({
					name: req.body.name
				}).then(function () {
					res.json(GLOBAL_RESPONSES.UPDATE_SUCCESS);
				}).catch(function (err) {
					res.send(err);
				});
			}
		}).catch(function () /*err*/{
			res.send(LOCAL_RESPONSES.KIT_NOT_FOUND);
		});
	});
};
//# sourceMappingURL=kit.controller.js.map
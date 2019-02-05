'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Using Rails-like standard naming convention for endpoints.
 * POST	/product				 ->	create
 * GET	 /product				 ->	getAll
 * GET	 /product /:id			->	getByID
 * DELETE	/product /:id			->	removeByID
 * PATCH	 /product /:id			->	updateByID
 */

//const _ = require('lodash');
//const {ObjectID} = require('mongodb');
var GLOBAL_RESPONSES = require('../global/responses');
var LOCAL_RESPONSES = require('./responses');

var _require = require('./../sequelize'),
    Kit = _require.Kit,
    Product = _require.Product,
    Op = _require.Op;

exports.create = function (req, res) {
	var ModelInstance = Product;
	var _req$body = req.body,
	    name = _req$body.name,
	    kits = _req$body.kits;
	// force: true will drop the table if it already exists

	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.create({
			name: name
		}).then(function (product) {
			if (kits) {
				Kit.findAll({
					where: {
						id: _defineProperty({}, Op.in, kits)
					}
				}).then(function (res) {
					product.addKits(res);
				});
			}
			var resultResponse = GLOBAL_RESPONSES.CREATE_SUCCESS;
			resultResponse.resourceId = product.dataValues.id;
			res.json({ resultResponse: resultResponse });
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.getAll = function (req, res) {
	var ModelInstance = Product;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.findAll({
			limit: 40
		}).then(function (product_result) {
			if (!product_result || product_result && product_result.length == 0) {
				res.json(LOCAL_RESPONSES.KIT_NOT_FOUND);
			}
			res.json(product_result);
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.getByID = function (req, res) {
	var ModelInstance = Product;
	// force: true will drop the table if it already exists
	ModelInstance.sync().then(function () {
		// Table created
		return Product.findOne({
			include: [{ model: Kit, attributes: { exclude: ['category_id'] }, through: { attributes: [] } }],
			where: {
				id: req.params.product_id
			}
		}).then(function (product) {
			if (!product) {
				res.json(LOCAL_RESPONSES.KIT_NOT_FOUND);
			}
			res.json(product);
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.removeByID = function (req, res) {
	var ModelInstance = Product;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.destroy({
			where: {
				id: req.params.product_id
			}
		}).then(function () /*results*/{
			res.json(GLOBAL_RESPONSES.DELETE_SUCCESS);
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.updateByID = function (req, res) {
	var ModelInstance = Product;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		ModelInstance.find({ where: { id: req.params.product_id } }).then(function (model) {
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
//# sourceMappingURL=product.controller.js.map
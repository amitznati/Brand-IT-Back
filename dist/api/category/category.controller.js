'use strict';

/**
 * Using Rails-like standard naming convention for endpoints.
 * POST	/category				 ->	create
 * GET	 /category				 ->	getAll
 * GET	 /category /:id			->	getByID
 * DELETE	/category /:id			->	removeByID
 * PATCH	 /category /:id			->	updateByID
 */

//const _ = require('lodash');
//const {ObjectID} = require('mongodb');
var GLOBAL_RESPONSES = require('../global/responses');
var LOCAL_RESPONSES = require('./responses');

var _require = require('./../sequelize'),
    Category = _require.Category,
    Kit = _require.Kit;

exports.create = function (req, res) {
	var ModelInstance = Category;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.create({
			name: req.body.name
		}).then(function (category) {
			var resultResponse = GLOBAL_RESPONSES.CREATE_SUCCESS;
			resultResponse.resourceId = category.dataValues.id;
			res.json({ resultResponse: resultResponse });
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.getAll = function (req, res) {
	var ModelInstance = Category;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.findAll({
			limit: 40
		}).then(function (category_result) {
			if (!category_result || category_result && category_result.length == 0) {
				res.json(LOCAL_RESPONSES.CATEGORY_NOT_FOUND);
			}
			res.json(category_result);
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.getByID = function (req, res) {
	var ModelInstance = Category;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.findOne({
			include: [{ model: Kit, attributes: ['id', 'name'] }],
			where: {
				id: req.params.category_id
			}
		}).then(function (category) {
			if (!category) {
				res.json(LOCAL_RESPONSES.CATEGORY_NOT_FOUND);
			}
			res.json(category);
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.removeByID = function (req, res) {
	var ModelInstance = Category;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		// Table created
		return ModelInstance.destroy({
			where: {
				id: req.params.category_id
			}
		}).then(function () /*results*/{
			res.json(GLOBAL_RESPONSES.DELETE_SUCCESS);
		}).catch(function (err) {
			res.send(err);
		});
	});
};

exports.updateByID = function (req, res) {
	var ModelInstance = Category;
	// force: true will drop the table if it already exists
	ModelInstance.sync({ force: false }).then(function () {
		ModelInstance.find({ where: { id: req.params.category_id } }).then(function (model) {
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
			res.send(LOCAL_RESPONSES.CATEGORY_NOT_FOUND);
		});
	});
};

exports.addKit = function (req, res) {
	var name = req.body.name;

	var CategoryId = req.params.category_id;
	var ModelInstance = Category;
	ModelInstance.findById(req.params.category_id).then(function () {
		return Kit.create({ name: name, CategoryId: CategoryId });
	}).then(function () {
		return Category.findOne({
			include: [Kit],
			where: {
				id: CategoryId
			}
		}).then(function (category) {
			if (!category) {
				res.json(LOCAL_RESPONSES.CATEGORY_NOT_FOUND);
			}
			res.json(category);
		}).catch(function (err) {
			res.send(err);
		});
	});
};
//# sourceMappingURL=category.controller.js.map
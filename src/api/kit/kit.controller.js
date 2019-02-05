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
const GLOBAL_RESPONSES = require('../global/responses');
const LOCAL_RESPONSES = require('./responses');

const {Kit,Category, Product} = require('./../sequelize');



exports.create = function(req, res) {
	let ModelInstance = Kit;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.create({
			...req.body
		}).then((kit) => {
			let resultResponse = GLOBAL_RESPONSES.CREATE_SUCCESS;
			resultResponse.resourceId = kit.dataValues.id;
			res.json({resultResponse});
		}).catch((err) =>{
			res.send(err);
		});
	});
};


exports.getAll = function (req, res) {
	let ModelInstance = Kit;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.findAll({
			limit: 40
		}).then((kit_result) => {
			if(!kit_result || (kit_result && kit_result.length == 0)){
				res.json(LOCAL_RESPONSES.KIT_NOT_FOUND);
			}
			res.json(kit_result);
		}).catch((err) =>{
			res.send(err);
		});

	});
	
};


exports.getByID = function (req, res) {
	let ModelInstance = Kit;
	// force: true will drop the table if it already exists
	ModelInstance.sync().then(function () {
		// Table created
		return Kit.findOne({
			include: [
				Category,
				{model: Product,through: { attributes: [] }}
			],
			where: {
				id: req.params.kit_id,
			},
			attributes: ['id','name']
		}).then((kit) => {
			if(!kit){
				res.json(LOCAL_RESPONSES.PRODUCT_NOT_FOUND);
			}
			res.json(kit);
		}).catch((err) =>{
			res.send(err);
		});

	});
};


exports.removeByID = function (req, res) {
	let ModelInstance = Kit;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.destroy({
			where: {
				id: req.params.kit_id,
			},
		}).then((/*results*/) => {
			res.json(GLOBAL_RESPONSES.DELETE_SUCCESS);
		}).catch((err) =>{
			res.send(err);
		});

	});
};


exports.updateByID = function (req, res) {
	let ModelInstance = Kit;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		ModelInstance.find({ where: { id: req.params.kit_id } }).then((model) =>
		{
		// Check if record exists in db
			if (model) {
				model.updateAttributes({
					name: req.body.name
				})
					.then(() => {
						res.json(GLOBAL_RESPONSES.UPDATE_SUCCESS);
					}).catch((err) => {
						res.send(err);
					});
			}
		}).catch((/*err*/) => {
			res.send(LOCAL_RESPONSES.KIT_NOT_FOUND);	
		});
	});
};
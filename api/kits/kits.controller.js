/**
 * Using Rails-like standard naming convention for endpoints.
 * POST	/kits			   ->  create
 * GET	 /kits			   ->  getAll
 * GET	 /kits /:id		  ->  getByID
 * DELETE  /kits /:id		  ->  removeByID
 * PATCH   /kits /:id		  ->  updateByID
 */

//const _ = require('lodash');
//const {ObjectID} = require('mongodb');
const GLOBAL_RESPONSES = require('../global/responses');
const LOCAL_RESPONSES = require('./responses');
const MODEL_PATH = './model/kits';
const MODEL_SERVICE = require(MODEL_PATH);
const Category = require('./../categories/model/categories');

exports.create = function(req, res) {
	let ModelInstance = MODEL_SERVICE;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
	// Table created
		Category.findOne({where: {
			id: req.body.category_id,
		}}).then(cat => {
			return ModelInstance.create({
				name : req.body.name,
				category: cat
			},{include: Category}).then((kits) => {
				let resultResponse = GLOBAL_RESPONSES.CREATE_SUCCESS;
				resultResponse.resourceId = kits.dataValues.id;
				res.json({resultResponse});
			}).catch((err) =>{
				res.send(err);
			});
		});
		
	});
};


exports.getAll = function (req, res) {
	let ModelInstance = MODEL_SERVICE;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.findAll({
			limit: 40
		}).then((kits_result) => {
			if(!kits_result || (kits_result && kits_result.length == 0)){
				res.json(LOCAL_RESPONSES.KITS_NOT_FOUND);
			}
			res.json(kits_result);
		}).catch((err) =>{
			res.send(err);
		});

	});
	
};


exports.getByID = function (req, res) {
	let ModelInstance = MODEL_SERVICE;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.findOne({
			where: {
				id: req.params.kits_id,
			},
		}).then((kits) => {
			if(!kits){
				res.json(LOCAL_RESPONSES.KITS_NOT_FOUND);
			}
			res.json(kits);
		}).catch((err) =>{
			res.send(err);
		});

	});
};


exports.removeByID = function (req, res) {
	let ModelInstance = MODEL_SERVICE;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.destroy({
			where: {
				id: req.params.kits_id,
			},
		}).then((/*results*/) => {
			res.json(GLOBAL_RESPONSES.DELETE_SUCCESS);
		}).catch((err) =>{
			res.send(err);
		});

	});
};


exports.updateByID = function (req, res) {
	let ModelInstance = MODEL_SERVICE;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		ModelInstance.find({ where: { id: req.params.kits_id } }).then((model) =>
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
			res.send(LOCAL_RESPONSES.KITS_NOT_FOUND);
		});
	});
};

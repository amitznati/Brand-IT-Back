/**
 * Using Rails-like standard naming convention for endpoints.
 * POST	/categories			   ->  create
 * GET	 /categories			   ->  getAll
 * GET	 /categories /:id		  ->  getByID
 * DELETE  /categories /:id		  ->  removeByID
 * PATCH   /categories /:id		  ->  updateByID
 */

//const _ = require('lodash');
//const {ObjectID} = require('mongodb');
const GLOBAL_RESPONSES = require('../global/responses');
const LOCAL_RESPONSES = require('./responses');
const MODEL_PATH = './model/categories';
const MODEL_SERVICE = require(MODEL_PATH);
//const Kit = require('./../kits/model/kits');

exports.create = function(req, res) {
	let ModelInstance = MODEL_SERVICE;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
	// Table created
		return ModelInstance.create({
			name : req.body.name
		}).then((categories) => {
			let resultResponse = GLOBAL_RESPONSES.CREATE_SUCCESS;
			resultResponse.resourceId = categories.dataValues.id;
			res.json({resultResponse});
		}).catch((err) =>{
			res.send(err);
		});
	});
};


exports.getAll = function (req, res) {
	let ModelInstance = MODEL_SERVICE;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.findAll({
			include: ['kits'],
			limit: 40
		}).then((categories_result) => {
			if(!categories_result || (categories_result && categories_result.length == 0)){
				res.json(LOCAL_RESPONSES.CATEGORIES_NOT_FOUND);
			}
			res.json(categories_result);
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
				id: req.params.categories_id,
			},
		}).then((categories) => {
			if(!categories){
				res.json(LOCAL_RESPONSES.CATEGORIES_NOT_FOUND);
			}
			res.json(categories);
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
				id: req.params.categories_id,
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
		ModelInstance.find({ 
			where: { id: req.params.categories_id },
		})
			.then((model) =>
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
				res.send(LOCAL_RESPONSES.CATEGORIES_NOT_FOUND);  
			});
	});
};
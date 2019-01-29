/**
 * Using Rails-like standard naming convention for endpoints.
 * POST	/themes			   ->  create
 * GET	 /themes			   ->  getAll
 * GET	 /themes /:id		  ->  getByID
 * DELETE  /themes /:id		  ->  removeByID
 * PATCH   /themes /:id		  ->  updateByID
 */

//const _ = require('lodash');
//const {ObjectID} = require('mongodb');
const GLOBAL_RESPONSES = require('../global/responses');
const LOCAL_RESPONSES = require('./responses');
const MODEL_PATH = './model/themes';
const MODEL_SERVICE = require(MODEL_PATH);


exports.create = function(req, res) {
	let ModelInstance = MODEL_SERVICE;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
	// Table created
		return ModelInstance.create({
			name : req.body.name
		}).then((themes) => {
			let resultResponse = GLOBAL_RESPONSES.CREATE_SUCCESS;
			resultResponse.resourceId = themes.dataValues.id;
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
			limit: 40
		}).then((themes_result) => {
			if(!themes_result || (themes_result && themes_result.length == 0)){
				res.json(LOCAL_RESPONSES.THEMES_NOT_FOUND);
			}
			res.json(themes_result);
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
				id: req.params.themes_id,
			},
		}).then((themes) => {
			if(!themes){
				res.json(LOCAL_RESPONSES.THEMES_NOT_FOUND);
			}
			res.json(themes);
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
				id: req.params.themes_id,
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
		ModelInstance.find({ where: { id: req.params.themes_id } }).then((model) =>
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
			res.send(LOCAL_RESPONSES.THEMES_NOT_FOUND);
		});
	});
};
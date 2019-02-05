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
const GLOBAL_RESPONSES = require('../global/responses');
const LOCAL_RESPONSES = require('./responses');

const {Theme} = require('./../sequelize');



exports.create = function(req, res) {
	let ModelInstance = Theme;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.create({
			...req.body
		}).then((theme) => {
			let resultResponse = GLOBAL_RESPONSES.CREATE_SUCCESS;
			resultResponse.resourceId = theme.dataValues.id;
			res.json({resultResponse});
		}).catch((err) =>{
			res.send(err);
		});
	});
};


exports.getAll = function (req, res) {
	let ModelInstance = Theme;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.findAll({
			limit: 40
		}).then((theme_result) => {
			if(!theme_result || (theme_result && theme_result.length == 0)){
				res.json(LOCAL_RESPONSES.THEME_NOT_FOUND);
			}
			res.json(theme_result);
		}).catch((err) =>{
			res.send(err);
		});

	});
	
};


exports.getByID = function (req, res) {
	let ModelInstance = Theme;
	// force: true will drop the table if it already exists
	ModelInstance.sync().then(function () {
		// Table created
		return Theme.findOne({
			where: {
				id: req.params.theme_id,
			},
		}).then((theme) => {
			if(!theme){
				res.json(LOCAL_RESPONSES.PRODUCT_NOT_FOUND);
			}
			res.json(theme);
		}).catch((err) =>{
			res.send(err);
		});

	});
};


exports.removeByID = function (req, res) {
	let ModelInstance = Theme;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.destroy({
			where: {
				id: req.params.theme_id,
			},
		}).then((/*results*/) => {
			res.json(GLOBAL_RESPONSES.DELETE_SUCCESS);
		}).catch((err) =>{
			res.send(err);
		});

	});
};


exports.updateByID = function (req, res) {
	let ModelInstance = Theme;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		ModelInstance.find({ where: { id: req.params.theme_id } }).then((model) =>
		{
		// Check if record exists in db
			if (model) {
				model.updateAttributes({
					...req.body
				})
					.then(() => {
						res.json(GLOBAL_RESPONSES.UPDATE_SUCCESS);
					}).catch((err) => {
						res.send(err);
					});
			}
		}).catch((/*err*/) => {
			res.send(LOCAL_RESPONSES.THEME_NOT_FOUND);	
		});
	});
};
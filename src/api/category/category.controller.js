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
const GLOBAL_RESPONSES = require('../global/responses');
const LOCAL_RESPONSES = require('./responses');
const {Category,Kit} = require('./../sequelize');

exports.create = function(req, res) {
	let ModelInstance = Category;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.create({
			name : req.body.name
		}).then((category) => {
			let resultResponse = GLOBAL_RESPONSES.CREATE_SUCCESS;
			resultResponse.resourceId = category.dataValues.id;
			res.json({resultResponse});
		}).catch((err) =>{
			res.send(err);
		});
	});
};


exports.getAll = function (req, res) {
	let ModelInstance = Category;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.findAll({	
			limit: 40
		}).then((category_result) => {
			if(!category_result || (category_result && category_result.length == 0)){
				res.json(LOCAL_RESPONSES.CATEGORY_NOT_FOUND);
			}
			res.json(category_result);
		}).catch((err) =>{
			res.send(err);
		});

	});
	
};


exports.getByID = function (req, res) {
	let ModelInstance = Category;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.findOne({
			include: [{model: Kit, attributes: ['id','name']}],
			where: {
				id: req.params.category_id,
			},
		}).then((category) => {
			if(!category){
				res.json(LOCAL_RESPONSES.CATEGORY_NOT_FOUND);
			}
			res.json(category);
		}).catch((err) =>{
			res.send(err);
		});

	});
};


exports.removeByID = function (req, res) {
	let ModelInstance = Category;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.destroy({
			where: {
				id: req.params.category_id,
			},
		}).then((/*results*/) => {
			res.json(GLOBAL_RESPONSES.DELETE_SUCCESS);
		}).catch((err) =>{
			res.send(err);
		});

	});
};


exports.updateByID = function (req, res) {
	let ModelInstance = Category;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		ModelInstance.find({ where: { id: req.params.category_id } }).then((model) =>
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
			res.send(LOCAL_RESPONSES.CATEGORY_NOT_FOUND);	
		});
	});
};

exports.addKit = (req,res) => {
	const {name} = req.body;
	const CategoryId = req.params.category_id;
	let ModelInstance = Category;
	ModelInstance.findById(req.params.category_id)
		.then(() => Kit.create({name,CategoryId}))
		.then(() => Category.findOne({
			include: [Kit],
			where: {
				id: CategoryId,
			},
		}).then((category) => {
			if(!category){
				res.json(LOCAL_RESPONSES.CATEGORY_NOT_FOUND);
			}
			res.json(category);
		}).catch((err) =>{
			res.send(err);
		}));
};
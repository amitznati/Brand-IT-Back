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
const GLOBAL_RESPONSES = require('../global/responses');
const LOCAL_RESPONSES = require('./responses');
const {Kit,Product, Op} = require('./../sequelize');



exports.create = function(req, res) {
	let ModelInstance = Product;
	const {name,kits} = req.body;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.create({
			name: name
		}).then((product) => {
			if(kits) {
				Kit.findAll({
					where: {
						id: {
							[Op.in]: kits
						}
					}
				}).then((res) => {
					product.addKits(res);
				});
			}
			let resultResponse = GLOBAL_RESPONSES.CREATE_SUCCESS;
			resultResponse.resourceId = product.dataValues.id;
			res.json({resultResponse});
		}).catch((err) =>{
			res.send(err);
		});
	});
};


exports.getAll = function (req, res) {
	let ModelInstance = Product;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.findAll({
			limit: 40
		}).then((product_result) => {
			if(!product_result || (product_result && product_result.length == 0)){
				res.json(LOCAL_RESPONSES.KIT_NOT_FOUND);
			}
			res.json(product_result);
		}).catch((err) =>{
			res.send(err);
		});

	});
	
};


exports.getByID = function (req, res) {
	let ModelInstance = Product;
	// force: true will drop the table if it already exists
	ModelInstance.sync().then(function () {
		// Table created
		return Product.findOne({
			include: [{model: Kit, through: { attributes: [] }}],
			where: {
				id: req.params.product_id,
			},
		}).then((product) => {
			if(!product){
				res.json(LOCAL_RESPONSES.KIT_NOT_FOUND);
			}
			res.json(product);
		}).catch((err) =>{
			res.send(err);
		});

	});
};


exports.removeByID = function (req, res) {
	let ModelInstance = Product;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		// Table created
		return ModelInstance.destroy({
			where: {
				id: req.params.product_id,
			},
		}).then((/*results*/) => {
			res.json(GLOBAL_RESPONSES.DELETE_SUCCESS);
		}).catch((err) =>{
			res.send(err);
		});

	});
};


exports.updateByID = function (req, res) {
	let ModelInstance = Product;
	// force: true will drop the table if it already exists
	ModelInstance.sync({force: false}).then(function () {
		ModelInstance.find({ where: { id: req.params.product_id } }).then((model) =>
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
const {Router} = require('express');
//const {authenticate} = require('./../../middleware/authenticate');

const controller = require('./product.controller');

var router = new Router();
/**
 * @api {post} /product create
 * @apiName CreateProduct
 * @apiGroup Product
 *
 * @apiParam {String} name .
 *
 * @apiSuccess {Object} - contain message and resource id.
 */
router.post('/', controller.create);

/**
 * @api {get} /product all
 * @apiName GetAllProduct
 * @apiGroup Product
 * @apiSuccess {Object} - contain items from resource.
 */
router.get('/',	controller.getAll);

/**
 * @api {get} /product/:id	get
 * @apiName GetProductById
 * @apiGroup Product
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - resource.
 */
router.get('/:product_id',	controller.getByID);

/**
 * @api {delete} /product/:id	delete
 * @apiName RemoveProductById
 * @apiGroup Product
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.delete('/:product_id',	controller.removeByID);

/**
 * @api {put} /product/:id	update
 * @apiName UpdateProductById
 * @apiGroup Product
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.put('/:product_id', controller.updateByID);

module.exports = router;
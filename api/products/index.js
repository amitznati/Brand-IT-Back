const {Router} = require('express');
//const {authenticate} = require('./../../middleware/authenticate');

const controller = require('./products.controller');

var router = new Router();

/**
 * @api {post} /products create
 * @apiName CreateProducts
 * @apiGroup Products
 *
 * @apiParam {String} name .
 *
 * @apiSuccess {Object} - contain message and resource id.
 */
router.post('/', controller.create);

/**
 * @api {get} /products all
 * @apiName GetAllProducts
 * @apiGroup Products
 * @apiSuccess {Object} - contain items from resource.
 */
router.get('/',  controller.getAll);

/**
 * @api {get} /products/:id  get
 * @apiName GetProductsById
 * @apiGroup Products
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - resource.
 */
router.get('/:products_id',  controller.getByID);

/**
 * @api {delete} /products/:id  delete
 * @apiName RemoveProductsById
 * @apiGroup Products
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.delete('/:products_id',  controller.removeByID);

/**
 * @api {put} /products/:id  update
 * @apiName UpdateProductsById
 * @apiGroup Products
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.put('/:products_id', controller.updateByID);

module.exports = router;
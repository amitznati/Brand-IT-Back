const {Router} = require('express');
//const {authenticate} = require('./../../middleware/authenticate');

const controller = require('./categories.controller');

var router = new Router();

/**
 * @api {post} /categories create
 * @apiName CreateCategories
 * @apiGroup Categories
 *
 * @apiParam {String} name .
 *
 * @apiSuccess {Object} - contain message and resource id.
 */
router.post('/', controller.create);

/**
 * @api {get} /categories all
 * @apiName GetAllCategories
 * @apiGroup Categories
 * @apiSuccess {Object} - contain items from resource.
 */
router.get('/',  controller.getAll);

/**
 * @api {get} /categories/:id  get
 * @apiName GetCategoriesById
 * @apiGroup Categories
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - resource.
 */
router.get('/:categories_id',  controller.getByID);

/**
 * @api {delete} /categories/:id  delete
 * @apiName RemoveCategoriesById
 * @apiGroup Categories
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.delete('/:categories_id',  controller.removeByID);

/**
 * @api {put} /categories/:id  update
 * @apiName UpdateCategoriesById
 * @apiGroup Categories
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.put('/:categories_id', controller.updateByID);

module.exports = router;
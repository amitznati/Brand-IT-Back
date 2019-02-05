'use strict';

var _require = require('express'),
    Router = _require.Router;
//const {authenticate} = require('./../../middleware/authenticate');

var controller = require('./category.controller');

var router = new Router();
router.post('/:category_id/addKit', controller.addKit);
/**
 * @api {post} /category create
 * @apiName CreateCategory
 * @apiGroup Category
 *
 * @apiParam {String} name .
 *
 * @apiSuccess {Object} - contain message and resource id.
 */
router.post('/', controller.create);

/**
 * @api {get} /category all
 * @apiName GetAllCategory
 * @apiGroup Category
 * @apiSuccess {Object} - contain items from resource.
 */
router.get('/', controller.getAll);

/**
 * @api {get} /category/:id  get
 * @apiName GetCategoryById
 * @apiGroup Category
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - resource.
 */
router.get('/:category_id', controller.getByID);

/**
 * @api {delete} /category/:id  delete
 * @apiName RemoveCategoryById
 * @apiGroup Category
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.delete('/:category_id', controller.removeByID);

/**
 * @api {put} /category/:id  update
 * @apiName UpdateCategoryById
 * @apiGroup Category
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.put('/:category_id', controller.updateByID);

module.exports = router;
//# sourceMappingURL=index.js.map
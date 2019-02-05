'use strict';

var _require = require('express'),
    Router = _require.Router;
//const {authenticate} = require('./../../middleware/authenticate');

var controller = require('./kit.controller');

var router = new Router();
/**
 * @api {post} /kit create
 * @apiName CreateKit
 * @apiGroup Kit
 *
 * @apiParam {String} name .
 *
 * @apiSuccess {Object} - contain message and resource id.
 */
router.post('/', controller.create);

/**
 * @api {get} /kit all
 * @apiName GetAllKit
 * @apiGroup Kit
 * @apiSuccess {Object} - contain items from resource.
 */
router.get('/', controller.getAll);

/**
 * @api {get} /kit/:id	get
 * @apiName GetKitById
 * @apiGroup Kit
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - resource.
 */
router.get('/:kit_id', controller.getByID);

/**
 * @api {delete} /kit/:id	delete
 * @apiName RemoveKitById
 * @apiGroup Kit
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.delete('/:kit_id', controller.removeByID);

/**
 * @api {put} /kit/:id	update
 * @apiName UpdateKitById
 * @apiGroup Kit
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.put('/:kit_id', controller.updateByID);

module.exports = router;
//# sourceMappingURL=index.js.map
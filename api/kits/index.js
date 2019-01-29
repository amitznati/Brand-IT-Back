const {Router} = require('express');
//const {authenticate} = require('./../../middleware/authenticate');

const controller = require('./kits.controller');

var router = new Router();

/**
 * @api {post} /kits create
 * @apiName CreateKits
 * @apiGroup Kits
 *
 * @apiParam {String} name .
 *
 * @apiSuccess {Object} - contain message and resource id.
 */
router.post('/', controller.create);

/**
 * @api {get} /kits all
 * @apiName GetAllKits
 * @apiGroup Kits
 * @apiSuccess {Object} - contain items from resource.
 */
router.get('/',  controller.getAll);

/**
 * @api {get} /kits/:id  get
 * @apiName GetKitsById
 * @apiGroup Kits
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - resource.
 */
router.get('/:kits_id',  controller.getByID);

/**
 * @api {delete} /kits/:id  delete
 * @apiName RemoveKitsById
 * @apiGroup Kits
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.delete('/:kits_id',  controller.removeByID);

/**
 * @api {put} /kits/:id  update
 * @apiName UpdateKitsById
 * @apiGroup Kits
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.put('/:kits_id', controller.updateByID);

module.exports = router;
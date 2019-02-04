const {Router} = require('express');
//const {authenticate} = require('./../../middleware/authenticate');

const controller = require('./theme.controller');

var router = new Router();
/**
 * @api {post} /theme create
 * @apiName CreateTheme
 * @apiGroup Theme
 *
 * @apiParam {String} name .
 *
 * @apiSuccess {Object} - contain message and resource id.
 */
router.post('/', controller.create);

/**
 * @api {get} /theme all
 * @apiName GetAllTheme
 * @apiGroup Theme
 * @apiSuccess {Object} - contain items from resource.
 */
router.get('/',	controller.getAll);

/**
 * @api {get} /theme/:id	get
 * @apiName GetThemeById
 * @apiGroup Theme
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - resource.
 */
router.get('/:theme_id',	controller.getByID);

/**
 * @api {delete} /theme/:id	delete
 * @apiName RemoveThemeById
 * @apiGroup Theme
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.delete('/:theme_id',	controller.removeByID);

/**
 * @api {put} /theme/:id	update
 * @apiName UpdateThemeById
 * @apiGroup Theme
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.put('/:theme_id', controller.updateByID);

module.exports = router;
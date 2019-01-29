const {Router} = require('express');
//const {authenticate} = require('./../../middleware/authenticate');

const controller = require('./themes.controller');

var router = new Router();

/**
 * @api {post} /themes create
 * @apiName CreateThemes
 * @apiGroup Themes
 *
 * @apiParam {String} name .
 *
 * @apiSuccess {Object} - contain message and resource id.
 */
router.post('/', controller.create);

/**
 * @api {get} /themes all
 * @apiName GetAllThemes
 * @apiGroup Themes
 * @apiSuccess {Object} - contain items from resource.
 */
router.get('/',  controller.getAll);

/**
 * @api {get} /themes/:id  get
 * @apiName GetThemesById
 * @apiGroup Themes
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - resource.
 */
router.get('/:themes_id',  controller.getByID);

/**
 * @api {delete} /themes/:id  delete
 * @apiName RemoveThemesById
 * @apiGroup Themes
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.delete('/:themes_id',  controller.removeByID);

/**
 * @api {put} /themes/:id  update
 * @apiName UpdateThemesById
 * @apiGroup Themes
 *
 * @apiParam {String} id .
 *
 * @apiSuccess {Object} - contain message.
 */
router.put('/:themes_id', controller.updateByID);

module.exports = router;
const {Router} = require('express');
var fs = require('fs');
//const {authenticate} = require('./../../middleware/authenticate');

const controller = require('./theme.controller');
var multer  = require('multer');
var storage =  multer.diskStorage({
	destination: function (req, file, cb) {
		if (!fs.existsSync('./uploads/themes/' + req.body.name)){
			fs.mkdirSync('./uploads/themes/' + req.body.name);
		}
		cb(null, './uploads/themes/' + req.body.name);
	},
	filename: function (req, file, cb) {
		var ext = file.originalname.split('.')[1];
		cb(null, `${file.fieldname}.${ext}`);
	}
});
var upload = multer({ storage });
var cpUpload = upload.fields([{ name: 'bg-p', maxCount: 1 }, { name: 'bg-l', maxCount: 1 }]);

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

router.post('/',cpUpload, controller.create);

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
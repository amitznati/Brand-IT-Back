/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /users              ->  create
 * GET     /users/me           ->  me
 * DELETE  /users/me/logout    ->  logout
 * POST    /users/login        ->  login
 */

const _ = require('lodash');
const User = require('./user-model');
const RESPONSES = require('../responses');



exports.create = function(req, res) {
    let UserInstance = User;
	var body = _.pick(req.body, ['email', 'password']);
    var user = UserInstance.build({
        email : req.body.email,
        password : req.body.password
    });
    
    return UserInstance.sync({force: false}).then(function () {
      // Table created
      return user.preSave(() => {
        user.save({
        email : req.body.email,
        password : req.body.password
        }).then(() => {
			return user.generateAuthToken();
	    }).then((token) => {
			res.header('x-auth', token).send(user);
	    }).catch((e) => {
            res.status(403).json(RESPONSES.GENERAL_ERROR);
	    });
     });
  });
};

// Get the current user
exports.me = function(req, res) {
	res.send(req.user);
};

exports.login = function(req, res) {

	var body = _.pick(req.body, ['email', 'password']);
    
	return User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
            
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
        
		res.status(403).send();
	});

};


exports.logout = function(req, res) {
    return req.user.removeTokenLogout(req.token).then((result) => {
        res.status(200).send();
	}).catch((e) => {
        
		res.status(403).send();
	});
};
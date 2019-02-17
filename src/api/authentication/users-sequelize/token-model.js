const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require ('lodash');
const bcrypt = require ('bcryptjs');

var Sequelize     = require('sequelize');
const config      = require('../../../config');
var sequelize = new Sequelize(config.sql.db, config.sql.user, config.sql.pass,{logging: false});
var TokensSchema = sequelize.define('Tokens', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    access:{
			type: Sequelize.STRING
			
	},
	token: {
			type: Sequelize.STRING
	}
	
});






module.exports = TokensSchema;
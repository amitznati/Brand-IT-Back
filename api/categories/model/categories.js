var Sequelize	 = require('sequelize');
const config	  = require('../../../db');
var kit = require('./../../kits/model/kits');

var sequelize = new Sequelize(config.sql.db);
var CategoriesSchema = sequelize.define('categories', {
	id: {
		type: Sequelize.INTEGER(11).UNSIGNED,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		field: 'id'
	},
	name: {
		type: Sequelize.STRING(45),
		allowNull: false,
		unique: true,
		field: 'name'
	}
}, {
	tableName: 'categories',
	timestamps: false

});
CategoriesSchema.hasMany(kit, {as: 'kits'});
module.exports = CategoriesSchema;
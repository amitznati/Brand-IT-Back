var Sequelize		 = require('sequelize');
const config	  = require('../../../db');
var sequelize = new Sequelize(config.sql.db);
var ProductsSchema = sequelize.define('products', {
	id: {
		type: Sequelize.INTEGER(10).UNSIGNED,
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
	tableName: 'products',
	timestamps: false
});

module.exports = ProductsSchema;
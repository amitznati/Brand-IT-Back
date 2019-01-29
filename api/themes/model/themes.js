var Sequelize		 = require('sequelize');
const config		= require('../../../db');
var sequelize = new Sequelize(config.sql.db);
var ThemesSchema = sequelize.define('themes', {
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
	tableName: 'themes',
	timestamps: false
});

module.exports = ThemesSchema;
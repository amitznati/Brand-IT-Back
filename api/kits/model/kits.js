var Sequelize		 = require('sequelize');
const config	  = require('../../../db');
var sequelize = new Sequelize(config.sql.db);
var product = require('./../../products/model/products');
//var category = require('./../../categories/model/categories');
var KitsSchema = sequelize.define('kits', {
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
	},
	category_id: {
		type: Sequelize.INTEGER(10).UNSIGNED,
		allowNull: false,
		references: {
			model: 'categories',
			key: 'id'
		},
		field: 'category_id'
	}
}, {
	tableName: 'kits',
	timestamps: false
});
KitsSchema.belongsToMany(product, { as: 'Products', through: 'kits_products', foreignKey: 'kit_id' });
product.belongsToMany(KitsSchema ,{ as: 'Kits', through: 'kits_products', foreignKey: 'product_id' });
module.exports = KitsSchema;
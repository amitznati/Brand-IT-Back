'use strict';

var Sequelize = require('sequelize');
var config = require('../db');
var sequelize = new Sequelize(config.sql.db);
var Op = Sequelize.Op;

var CategoryModel = require('./category/model/category');
var KitModel = require('./kit/model/kit');
var ProductModel = require('./product/model/product');
var ThemeModel = require('./theme/model/theme');
//const User = UserModel(sequelize, Sequelize);
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
var KitProduct = sequelize.define('kit_product', {});
//const Blog = BlogModel(sequelize, Sequelize);
//const Tag = TagModel(sequelize, Sequelize);
var Category = CategoryModel(sequelize, Sequelize);
var Kit = KitModel(sequelize, Sequelize);
var Product = ProductModel(sequelize, Sequelize);
var Theme = ThemeModel(sequelize, Sequelize);
//Blog.belongsToMany(Tag, { through: BlogTag, unique: false });
//Tag.belongsToMany(Blog, { through: BlogTag, unique: false });
//Blog.belongsTo(User);
Category.hasMany(Kit, { foreignKey: 'category_id', sourceKey: 'id' });
Kit.belongsTo(Category, { foreignKey: 'category_id', sourceKey: 'id' });

Kit.belongsToMany(Product, { through: KitProduct });
Product.belongsToMany(Kit, { through: KitProduct });

sequelize.sync({ force: true }).then(function () {
	console.log('Database & tables created!');
});

module.exports = {
	Op: Op,
	Category: Category,
	Kit: Kit,
	Product: Product,
	Theme: Theme
};
//# sourceMappingURL=sequelize.js.map
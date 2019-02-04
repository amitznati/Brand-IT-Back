
const Sequelize = require('sequelize');
const config		= require('../db');
var sequelize = new Sequelize(config.sql.db);
const {Op} = Sequelize;
const CategoryModel = require('./category/model/category');
const KitModel = require('./kit/model/kit');
const ProductModel = require('./product/model/product');
//const User = UserModel(sequelize, Sequelize);
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
const KitProduct = sequelize.define('kit_product', {});
//const Blog = BlogModel(sequelize, Sequelize);
//const Tag = TagModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize,Sequelize);
const Kit = KitModel(sequelize,Sequelize);
const Product = ProductModel(sequelize,Sequelize);
//Blog.belongsToMany(Tag, { through: BlogTag, unique: false });
//Tag.belongsToMany(Blog, { through: BlogTag, unique: false });
//Blog.belongsTo(User);
Category.hasMany(Kit, {foreignKey: 'category_id', sourceKey: 'id'});
Kit.belongsTo(Category,{foreignKey: 'category_id', sourceKey: 'id'});

Kit.belongsToMany(Product, { through: KitProduct });
Product.belongsToMany(Kit, { through: KitProduct });

sequelize.sync({ force: true })
	.then(() => {
		console.log('Database & tables created!');
	});

module.exports = {
	Op,
	Category,
	Kit,
	Product
};
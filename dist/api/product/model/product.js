'use strict';

module.exports = function (sequelize, type) {
	return sequelize.define('Product', {
		id: {
			type: type.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: type.STRING

	}, {
		freezeTableName: true, // Model tableName will be the same as the model name
		timestamps: false
	});
};
//# sourceMappingURL=product.js.map
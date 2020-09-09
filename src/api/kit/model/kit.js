module.exports = (sequelize, type) => {
	return sequelize.define('Kit', {
		id: {
			type: type.INTEGER(10).UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
		name: type.STRING,
		category_id: {
			type: type.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'Category',
				key: 'id'
			},
			field: 'category_id'
		}
		
	}, {
		freezeTableName: true, // Model tableName will be the same as the model name
		timestamps: false
	});
};

module.exports = (sequelize, type) => {
	return sequelize.define('Theme', {
		id: {
			type: type.INTEGER(10).UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
		name: type.STRING,
	}, {
		freezeTableName: true, // Model tableName will be the same as the model name
		timestamps: false
	});
};

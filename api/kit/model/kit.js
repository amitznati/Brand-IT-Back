module.exports = (sequelize, type) => {
	return sequelize.define('Kit', {
		id: {
			type: type.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: type.STRING,
		
	}, {
		freezeTableName: true, // Model tableName will be the same as the model name
		timestamps: false
	});
};

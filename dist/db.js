'use strict';

module.exports = {
	useSql: true,
	useMongo: true,
	sql: {
		db: 'mysql://amitznati:12345678@localhost:3306/bi2'
	},
	mongo: {
		dbUrl: process.env.MONGO_URL || 'mongodb://branditdb_user:Nvrcungahl26@ds129914.mlab.com:29914/branditdb'
	}
};
//# sourceMappingURL=db.js.map
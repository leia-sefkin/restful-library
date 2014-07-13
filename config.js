/*

app config 

options for which storage and routes are used

*/

module.exports = {
	
	mongo: {
		db_init: __dirname + '/app/mongo.js',
		express_port: process.env.EXPRESS_PORT || 3000,
		express_ip: '127.0.0.1',
		routes: __dirname + '/app/mongo_routes.js'
	},

	nedb: {
		db_init: __dirname + '/app/nedb.js',
		express_port: process.env.EXPRESS_PORT || 3000,
		express_ip: '127.0.0.1',
		routes: __dirname + '/app/ne_routes.js'
	}

};



  
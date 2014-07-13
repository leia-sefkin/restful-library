/*

nedb datastore initialization

currently everything is stored in memory

nedb offers other options for storage:
https://github.com/louischatriot/nedb

*/
var Datastore = require('nedb');
	
module.exports = {
	init: function() {
		return new Datastore();
	}
};
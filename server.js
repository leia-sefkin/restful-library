/*

API initialization and base configuration

*/

//node modules
var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');
	
//setting data store and route options
var env = process.env.NODE_ENV || 'mongo';
var config = require('./config')[env];

var app = express();

//initalize the datastore
var db_initialize = require(config.db_init);
//for when we need a reference to the datastore obj
db = db_initialize.init();

//middleware
//parse app JSON
app.use(bodyParser.json());
//method override 
app.use(methodOverride('X-HTTP-Method-Override'));
//static file directory
app.use(express.static(__dirname + '/public'));

//logging info
app.use(function(req, res, next) {

	if(res.statusCode != null) 
		console.log("" + req.method + " - " + req.url + " - " + res.statusCode);

	next();
});

//routes
require(config.routes)(app);

//start the app
app.listen(config.express_port, config.express_ip, function (error) {
  
  if (error) {
    console.error("Unable to listen for connections", error);
    process.exit(10);
  }
  
  console.info("express is listening on http://" + config.express_ip + ":" + config.express_port);
});

exports = module.exports = app;
/*

mongodb initialization

*/

var mongoose = require('mongoose');

module.exports = {
  init: function() {
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.on('connected', console.log.bind(console, 'connection to mongo successful'));
    return mongoose.connect("mongodb://localhost:27017/library");
  }
};
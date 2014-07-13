/*

Book schema for use with MongoDB

*/
var mongoose = require('mongoose');

var Book = new mongoose.Schema({
	author: String,
	title: String
});

module.exports = mongoose.model('Book', Book);
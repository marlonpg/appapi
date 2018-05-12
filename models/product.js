// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Product', new Schema({ 
	userEmail: String,
	name: String,
	description: String,
	city: String,
	state: String,
	zipCode: String,
	category: String,
	expirationDate: String,
	filePath: String
}));
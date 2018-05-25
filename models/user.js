var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

module.exports = mongoose.model('User', new Schema({ 
	name: String, 
    email: String, 
    password: String, 
    admin: Boolean 
}));
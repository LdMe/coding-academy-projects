let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
	username: {
		type:String,
		required: 'username required',
		unique: true,
		index: true
	},
	email: {
		type:String,
		required: 'email required'
	},
	password :{
		type: String,
		required: 'password is required'
	},
	bio: {
		type: String
	},
	roles: [{
		type: String,
		enum: ['user','admin'],
		default: 'user'
	}]


});
module.exports= mongoose.model('user',userSchema);
let mongoose = require('mongoose');
let postSchema = new mongoose.Schema({
	title: {
		type:String,
		required: 'title required',
		
	},
	description: {
		type:String
	},
	user :{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'user',
		required: 'user is required'
	},
	creation_date: {
		type: Date
	},
	image: {
		type: String
	},
	last_update: {
		type: Date
	},
	visibility: {
		type: String,
		enum: ['public','friends','private'],
		default: 'public'
	}


});
module.exports= mongoose.model('post',postSchema);
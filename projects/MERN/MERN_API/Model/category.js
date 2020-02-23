let mongoose = require('mongoose');
let categorySchema = new mongoose.Schema({
	title: {
		type:String,
		required: 'title required',
		unique: true,
		index: true
	},
	description: {
		type:String
	}


});
module.exports= mongoose.model('category',categorySchema);
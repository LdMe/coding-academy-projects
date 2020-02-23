let mongoose = require('mongoose');
let orderSchema = new mongoose.Schema({
	user :{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'user',
		required: 'user is required'
	},
	message: {
		type:String
	},
	status: {
		type: String,
		enum: ['pending','sent','done','closed'],
		default: 'pending'
	},
	products:[{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'product'
	}],
	creation_date: {
		type: Date
	},
	last_update: {
		type: Date
	},

	
});
module.exports= mongoose.model('order',orderSchema);
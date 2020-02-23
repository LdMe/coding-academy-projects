const order= require('../../Model/order');
const user= require('../../Model/user');
const config = require('../../Config/config');
const OrderShowController= {
	showAll: function(req,res){
		order.find().sort([['last_update',-1]]).populate("products").exec(function(err,orders){
			if(err){
				return res.status(401).send(err);
			}
			return res.send(orders);
		});
		
		
	},
	show: function(req,res){
		let temp =req.originalUrl.split("order/show/");
		let url= temp[temp.length - 1];
		url=config.ObjectId(url.split("/")[0]);
		console.log(url);
		let username = req.session.username;
		let filter={_id:url};
		//order.findOne(filter, function(err,orders){
		order.findOne(filter).populate("products").exec(function(err,orders){
			if(err){
				return res.status(500).send("could not search orders");
			}
			if(!orders){
				return res.status(204).send("no order found")
			}
			return res.send(orders);
		});
		
	}
}
module.exports=OrderShowController;
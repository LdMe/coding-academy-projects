const order = require('../../Model/order');
let user = require('../../Model/user');

const OrderCreateController= {
	create(req,res){
		console.log(req.file);
		let body=req.body;
		let filter= {
			username: req.session.username,	
		}
		user.findOne(filter, function(err,new_user){
			if(err){
				return res.status(401).send(err);
			}
			if(!new_user){
				return res.status(401).send("user not found");
			}
			let new_order= {
				user: new_user._id,
				creation_date: Date.now().toString(),
				last_update: Date.now().toString(),
			}
			if(body.message){
				new_order["message"]=body.message;
			}
			if(body.product){
				new_order["products"]=[body.product];
			}
			order.create(new_order, function(err,order_created){
				if(err){
					console.log("error");
						console.log(err.message);
						return res.send(err.message);
					}
					if(!order_created){
						return res.send("order not created");
					}
					console.log("order created");
					return res.send("order created");
			});
		})	
	}
}
module.exports=OrderCreateController;
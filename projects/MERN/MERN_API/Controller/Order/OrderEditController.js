const order = require('../../Model/order');
let user = require('../../Model/user');
const config = require('../../Config/config');
const fs = require('fs');
OrderEditController= {
	delete(req,res){
		let body=req.body;
		let filter= {
			username: req.session.username
		}
		filter["roles"]={$all:["admin"]};
		if(!body._id){
			return res.status(500).send("order _id not found")
		}
		user.findOne(filter, function(err,new_user){
			if(err){
				return res.status(401).send(err);
			}
			if(!new_user){
				return res.status(401).send("user not found");
			}
			order.findOne({_id:body._id},function(err,order_object){
				if(err){
					return res.status(401).send(err);
				}
				if(!order_object){
					return res.status(401).send("order not found");
				}
				order.remove({_id:body._id,user: new_user},function(err,result){
					if(err){
						return res.status(401).send(err);
					}
					if(!result){
						return res.status(500).send("order not found");
					}
					
					return res.send("order deleted");

				});
			});
			
			
		});
	},
	edit(req,res){
		let body=req.body;
		let filter= {
			username: req.session.username
		}
		filter["roles"]={$all:["admin"]};
		if(!body._id){
			return res.status(400).send("order _id not found")
		}
		user.findOne(filter, function(err,new_user){
			if(err){
				return res.status(500).send(err);
			}
			if(!new_user){
				return res.status(401).send("user has no rights to do this action");
			}
			order.findOne({_id:body._id},function(err,order_object){
				if(err){
					return res.status(500).send(err);
				}
				if(!order_object){
					return res.status(404).send("order not found");
				}

				let _id= order_object._id;
				let new_order= {_id: config.ObjectId(_id)};
				if(body.product){
					new_order["$push"]={products: body.product};
				}
				if( body.message != order_object.message){
					new_order["message"]=body.message
				}
				new_order["last_update"]= Date.now().toString();
				
				order.updateOne({_id:_id},new_order, function(error,order_edited){
					if(err){
						console.log("error");
						console.log(err.message);
						return res.status(500).send(err.message);
					}
					if(!order_edited){
						return res.status(500).send("could not edit order");
					}
					console.log("order edited");
					return res.send("order edited");
				});
			});
			
		});
		
	}
}
module.exports=OrderEditController;
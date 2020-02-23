const product = require('../../Model/product');
let user = require('../../Model/user');
const config = require('../../Config/config');
const fs = require('fs');
ProductEditController= {
	delete(req,res){
		let body=req.body;
		let filter= {
			username: req.session.username
		}
		filter["roles"]={$all:["admin"]};
		if(!body._id){
			return res.status(500).send("product _id not found")
		}
		user.findOne(filter, function(err,new_user){
			if(err){
				return res.status(401).send(err);
			}
			if(!new_user){
				return res.status(401).send("user not found");
			}
			product.findOne({_id:body._id},function(err,product_object){
				if(err){
					return res.status(401).send(err);
				}
				if(!product_object){
					return res.status(401).send("product not found");
				}
				let imagePath=config.dirname+'/public/uploads/products/'+product_object.image;
				product.remove({_id:body._id},function(err,result){
					if(err){
						return res.status(401).send(err);
					}
					if(!result){
						return res.status(500).send("product not found");
					}
					fs.unlink(imagePath,function(err){
						console.log(err);
					});
					return res.send("product deleted");

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
			return res.status(400).send("product _id not found")
		}
		user.findOne(filter, function(err,new_user){
			if(err){
				return res.status(500).send(err);
			}
			if(!new_user){
				return res.status(401).send("user has no rights to do this action");
			}
			product.findOne({_id:body._id},function(err,product_object){
				if(err){
					return res.status(500).send(err);
				}
				if(!product_object){
					return res.status(404).send("product not found");
				}

				let _id= product_object._id;
				let new_product= {_id: config.ObjectId(_id)};
				body.title ? new_product["title"]=body.title: null;
				body.price ? new_product["price"]=body.price: null;
				if( body.description != product_object.description){
					new_product["description"]=body.description
				}
				//if file added, remove previous one
				if(req.file){
					console.log(req.file);
					fs.unlink(config.dirname+'/public/uploads/'+new_user.username+"/products/"+product_object.image,function(err){
						console.log(err);
					});
					new_product["image"]=req.file.filename;
				}
				product.updateOne({_id:_id},new_product, function(error,product_created){
					if(err){
						console.log("error");
						console.log(err.message);
						return res.status(500).send(err.message);
					}
					if(!product_created){
						return res.status(500).send("could not edit product");
					}
					console.log("product edited");
					return res.send("product edited");
				});
			});
			
		});
		
	}
}
module.exports=ProductEditController;
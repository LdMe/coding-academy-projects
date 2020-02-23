const product = require('../../Model/product');
let user = require('../../Model/user');

const ProductCreateController= {
	create(req,res){
		console.log(req.file);
		let body=req.body;
		let filter= {
			username: req.session.username,
			
		}
		// only create products if admin
		filter["roles"]={$all:["admin"]};
		user.findOne(filter, function(err,new_user){
			if(err){
				return res.status(401).send(err);
			}
			if(!new_user){
				return res.status(401).send("user has no rights to do this action");
			}
			let new_product= {
				title: body.title,
				price: body.price,

			}
			if(body.description){
				new_product["description"]=body.description;
			}
			if(body.category){
				new_product["category"]=config.ObjectId(body.category);
			}
			if(req.file){
				console.log(req.file);
				new_product["image"]=req.file.filename;
			}
			product.create(new_product, function(err,product_created){
				if(err){
					console.log("error");
						console.log(err.message);
						return res.send(err.message);
					}
					if(!product_created){
						return res.send("product not created");
					}
					console.log("product created");
					return res.send("product created");
			});
		})
		
	}
}
module.exports=ProductCreateController;
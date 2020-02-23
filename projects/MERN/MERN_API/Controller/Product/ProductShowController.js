const product= require('../../Model/product');
const user= require('../../Model/user');
const config = require('../../Config/config');
const ProductShowController= {
	showAll: function(req,res){
		let filter= {};
		console.log(req.query);
		if(req.query._id){
			filter= {category:config.ObjectId(req.query._id)}
		}
		product.find(filter).sort([['title',1]]).populate("category").exec(function(err,products){
			if(err){
				return res.status(401).send(err);
			}
			return res.send(products);
		});
		
		
	},
	show: function(req,res){
		let temp =req.originalUrl.split("product/show/");
		let url= temp[temp.length - 1];
		url=config.ObjectId(url.split("/")[0]);
		console.log(url);
		let username = req.session.username;
		let filter={_id:url};
		//product.findOne(filter).populate("category").exec(function(err,products){
		product.findOne(filter, function(err,products){
			if(err){
				return res.status(500).send("could not search products");
			}
			if(!products){
				return res.status(204).send("no product found")
			}
			return res.send(products);
		});
		
	}
}
module.exports=ProductShowController;
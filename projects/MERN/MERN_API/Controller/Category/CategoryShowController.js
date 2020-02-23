const category= require('../../Model/category');
const user= require('../../Model/user');
const config = require('../../Config/config');
const CategoryShowController= {
	showAll: function(req,res){
		category.find().sort([['title',1]]).exec(function(err,categories){
			if(err){
				return res.status(401).send(err);
			}
			return res.send(categories);
		});
		
		
	},
	show: function(req,res){
		let temp =req.originalUrl.split("category/show/");
		let url= temp[temp.length - 1];
		url=config.ObjectId(url.split("/")[0]);
		let filter={_id:url};
		category.findOne(filter, function(err,categories){
			if(err){
				return res.status(500).send("could not search categories");
			}
			if(!categories){
				return res.status(204).send("no category found")
			}
			return res.send(categories);
		});
		
	}
}
module.exports=CategoryShowController;
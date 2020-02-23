const category = require('../../Model/category');
let user = require('../../Model/user');
const config = require('../../Config/config');

CategoryEditController= {
	delete(req,res){
		let body=req.body;
		let filter= {
			username: req.session.username
		}
		filter["roles"]={$all:["admin"]};
		if(!body._id){
			return res.status(500).send("category _id not found")
		}
		user.findOne(filter, function(err,new_user){
			if(err){
				return res.status(401).send(err);
			}
			if(!new_user){
				return res.status(401).send("user has no rights to do this action");
			}
			category.findOne({_id:body._id},function(err,category_object){
				if(err){
					return res.status(401).send(err);
				}
				if(!category_object){
					return res.status(401).send("category not found");
				}
				let imagePath=config.dirname+'/public/uploads/categorys/'+category_object.image;
				category.remove({_id:body._id},function(err,result){
					if(err){
						return res.status(401).send(err);
					}
					if(!result){
						return res.status(500).send("category not found");
					}
					return res.send("category deleted");

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
			return res.status(400).send("category _id not found")
		}
		user.findOne(filter, function(err,new_user){
			if(err){
				return res.status(500).send(err);
			}
			if(!new_user){
				return res.status(401).send("user has no rights to do this action");
			}
			category.findOne({_id:body._id},function(err,category_object){
				if(err){
					return res.status(500).send(err);
				}
				if(!category_object){
					return res.status(404).send("category not found");
				}

				let _id= category_object.id;
				let new_category= {_id: config.ObjectId(_id)};
				body.title ? new_category["title"]=body.title: null;
				if( body.description != category_object.description){
					new_category["description"]=body.description
				}
				
				category.updateOne({_id:_id},new_category, function(error,category_created){
					if(err){
						console.log("error");
						console.log(err.message);
						return res.status(500).send(err.message);
					}
					if(!category_created){
						return res.status(500).send("could not edit category");
					}
					console.log("category edited");
					return res.send("category edited");
				});
			});
			
		});
		
	}
}
module.exports=CategoryEditController;
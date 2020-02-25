const post = require('../../Model/post');
let user = require('../../Model/user');
const config = require('../../Config/config');
const fs = require('fs');
PostEditController= {
	delete(req,res){
		let body=req.body;
		let filter= {
			username: req.session.username
		}
		if(!body._id){
			return res.status(500).send("post _id not found")
		}
		user.findOne(filter, function(err,new_user){
			if(err){
				return res.status(401).send(err);
			}
			if(!new_user){
				return res.status(401).send("user not found");
			}
			post.findOne({_id:body._id},function(err,post_object){
				if(err){
					return res.status(401).send(err);
				}
				if(!post_object){
					return res.status(401).send("post not found");
				}
				let imagePath=config.dirname+'/public/uploads/'+new_user.username+"/posts/"+post_object.image;
				post.remove({_id:body._id},function(err,result){
					if(err){
						return res.status(401).send(err);
					}
					if(!result){
						return res.status(500).send("post not found");
					}
					fs.unlink(imagePath,function(err){
						console.log(err);
					});
					return res.send("post deleted");

				});
			});
			
			
		});
	},
	edit(req,res){
		let body=req.body;
		let filter= {
			username: req.session.username
		}
		if(!body._id){
			return res.status(400).send("post _id not found")
		}
		user.findOne(filter, function(err,new_user){
			if(err){
				return res.status(500).send(err);
			}
			if(!new_user){
				return res.status(401).send("user has no rights to do this action");
			}
			post.findOne({_id:body._id},function(err,post_object){
				if(err){
					return res.status(500).send(err);
				}
				if(!post_object){
					return res.status(404).send("post not found");
				}

				let _id= post_object.id;
				let new_post= {_id: config.ObjectId(_id)};
				body.title ? new_post["title"]=body.title: null;
				if( body.description != post_object.description){
					new_post["description"]=body.description
				}
				body.visibility ? new_post["visibility"]=body.visibility: null;
				new_post["last_update"]= Date.now().toString();
				console.log(new_post);
				if(req.file){
					console.log(req.file);
					fs.unlink(config.dirname+'/public/uploads/'+new_user.username+"/posts/"+post_object.image,function(err){
						console.log(err);
					});
					new_post["image"]=req.file.filename;
				}
				post.updateOne({_id:_id, user:new_user},new_post, function(error,post_created){
					if(err){
						console.log("error");
						console.log(err.message);
						return res.status(500).send(err.message);
					}
					if(!post_created){
						return res.status(500).send("could not edit post");
					}
					console.log("post edited");
					return res.send("post edited succesfully");
				});
			});
			
		});
		
	}
}
module.exports=PostEditController;
const post= require('../../Model/post');
const user= require('../../Model/user');
const config = require('../../Config/config');
const PostShowController= {
	showAll: function(req,res){
		if(!req.session.username){
			post.find({visibility:'public'}).sort([['creation_date',-1]]).populate("user", '-password').exec(function(err,posts){
				if(err){
					return res.status(401).send(err);
				}
				return res.send(posts);
			});
		}
		else{
			let username = req.session.username;
			user.findOne({username: username},function(err,result){
				if(err){
					return res.status(401).send("user not found");
				}

				if(!result){
					return res.send("user not connected");
				}
				post.find({$or:[{user: result._id},{visibility:'public'}]}).sort([['creation_date',-1]]).populate("user", '-password').exec(function(err,posts){
					if(err){
						return res.status(401).send(err);
					}
					return res.send(posts);
				});
			});
		}
		
	},
	show: function(req,res){
		let temp =req.originalUrl.split("post/show/");
		let url= temp[temp.length - 1];
		url=config.ObjectId(url.split("/")[0]);
		let username = req.session.username;
		user.findOne({username: username},function(err,result){
			if(err){
				return res.status(401).send("user not found");
			}
			let filter={_id:url,visibility:'public'};
			if(result){
				filter={$or:[{_id:url, user: result.id},{_id:url,visibility:'public'}]};

			}
			
			post.findOne(filter).populate("user", '-password').exec(function(err,posts){
				if(err){
					return res.status(500).send("could not search posts");
				}
				if(!posts){
					return res.status(204).send("no post found")
				}
				return res.send(posts);
			});
		});
	}
}
module.exports=PostShowController;
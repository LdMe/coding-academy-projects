const post = require('../../Model/post');
let user = require('../../Model/user');

const PostCreateController= {
	create(req,res){
		console.log(req.file);
		let body=req.body;
		let filter= {
			username: req.session.username
		}
		user.findOne(filter, function(err,new_user){
			if(err){
				return res.status(401).send(err);
			}
			if(!new_user){
				return res.status(401).send("user not found");
			}
			let new_post= {
				user: new_user,
				title: body.title,
				creation_date: Date.now().toString(),
				last_update: Date.now().toString(),
				visibility: body.visibility

			}
			if( body.description ){
					new_post["description"]=body.description
				}
			if(req.file){
				console.log(req.file);
				new_post["image"]=req.file.filename;
			}
			post.create(new_post, function(error,post_created){
				if(err){
					console.log("error");
						console.log(err.message);
						return res.send(err.message);
					}
					if(!post_created){
						return res.send("post not created");
					}
					console.log("post created");
					return res.send("post created");
			});
		})
		
	}
}
module.exports=PostCreateController;
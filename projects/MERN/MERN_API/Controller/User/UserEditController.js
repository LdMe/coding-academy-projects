let PassController = require('./PasswordController');
UserEditController= {
	edit(req,res){
		console.log(req.body);
		let username=req.session.username;
		let email = req.body.email;
		let bio = req.body.bio;
		let password_old = req.body.password_old;
		let password = req.body.password;
		let update={};
		if(bio){
			update["bio"]=bio;
		}
		if(email){
			update["email"]=email;
		}
		if(password){
			update["password"]=password;
		}
		if(!password && !password_old){
			
			user.updateOne({username: username},update,function(err,result){
				if(err){
					res.status(500).send("database error");
				}
				if(!result){
					res.status(500).send("could not update user");
				}
				return res.send("user updated");
			})
		}
		else{
			user.findOne({username:username},function(err,result){
				if(err){
					res.status(500).send("database error");
				}
				if(result){
					PassController.check(password_old,result.password,function(err,check){
						if(check){
							PassController.hash(password,function(err,hash){
								if(err){
									return res.status(500).send("error creating hash");
								}
								else{
									update["password"]=hash;
									user.updateOne({username: username},update,function(err,result){
										if(err){
											res.status(500).send("database error");
										}
										if(!result){
											res.status(500).send("could not update user");
										}
										return res.send("user updated");
									})
								}
							});
						}
						else{
							return res.status(401).send("password not correct");
						}
					})		
				}
				else{
					res.status(404).send("user not found");
				}

			})
		}

	}
}
module.exports=UserEditController;
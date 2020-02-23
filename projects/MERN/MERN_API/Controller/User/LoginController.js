let user = require('../../Model/user');
let passControler= require("./PasswordController");
const jwt = require('jsonwebtoken');
LoginController ={


	login(req,res) {
		console.log("login");
		console.log(req.body);
		let filter= {
			username: req.body.username
		}
		user.findOne(filter, function(err,new_user){
			if(err){
				return res.status(401).send(err);
			}
			if(!new_user){
				return res.status(404).send("user not found");
			}
			passControler.check(req.body.password,new_user.password,function(err,result){
				if(err){
					return res.status(500).send("error checking password");

				}
				console.log(result);
				if(!result){
					return res.status(401).send("password not correct");
				}

				username= new_user.username;
				let expiredate= 24* 2600;
				let token = jwt.sign({ username: username }, config.key, { algorithm: 'HS256' , expiresIn: expiredate}, 
					function(err, token) {
						if(err){
							return res.status(500).send("error creating token");
						}
						req.session.username=username;
						console.log(req.session);
						return res.send({token :token});	
					}
				);
			})

		})
		
	}
}
module.exports=LoginController;
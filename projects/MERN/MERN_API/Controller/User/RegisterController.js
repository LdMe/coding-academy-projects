const user = require('../../Model/user');
let PassController = require('./PasswordController');
RegisterController ={

	register: async (req,res) => {
		console.log("Register");
		console.log(req.body);
		PassController.hash(req.body.password, function(err,hashed){
			if(err){
				console.log(err);
				return res.status(500).send(err);
			}
			else{
				let new_user= {
					username: req.body.username,
					email : req.body.email,
					password : hashed,
					roles: ['user']
				}
				const usr =user.create(new_user,(err, person)=>{
					if(err){
						console.log(err.message);
						return res.status(500).send(err.message);
					}
					if(!user){
						return res.status(500).send("user not created");
					}
					console.log("user created");
					return res.send("user created");
				})
			}
		});
		
		
		
	}
}
module.exports=RegisterController;
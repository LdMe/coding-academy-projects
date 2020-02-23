
//function to verify if user is successfully connected


const jwt = require('jsonwebtoken');
const config= require('../../Config/config');

function verify(req, res, next){
	if(!req.headers.authorization){
		return res.send("no token found",401);
	}
	if(!req.session.username){
				return res.status(401).send("not logged in");
			}
	jwt.verify(req.headers.authorization,config.key,(err,decoded) =>{
		if(decoded){
			
			if(decoded.username!= req.session.username){
				return res.status(401).send("username not correct");
			}
			//put username in req.user for later use
			req.user =decoded.username;
			next();
//			return callback(result);
		}
		else{
			return res.status(500).send("error verifying password");
//			return callback("error decoding");
		}
		
		
	});
};

module.exports= verify;
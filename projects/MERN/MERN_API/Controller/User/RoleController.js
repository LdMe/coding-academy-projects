
//function to know user role


const config= require('../../Config/config');

function checkRole(req, res){
	user.findOne({username:req.session.username},function(err,result){
		let role="user";
		if(result.roles.includes("admin")){
			role= "admin";
		}
		else if(result.roles.includes("kitchen")){
			role="kitchen";
		}
		return res.send(role);
	});
	
};

module.exports= checkRole;
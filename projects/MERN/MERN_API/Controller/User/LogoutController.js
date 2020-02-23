

LogoutController= {
	logout(req,res){
		req.session.username='';
		return res.send("user logged out");
	}
}
module.exports=LogoutController;
const bcrypt = require('bcrypt');

module.exports.hash=function(password,callback) {
	const saltRounds =10;
	bcrypt.genSalt(saltRounds,function(err,salt) {
		bcrypt.hash(password,salt,function(err,hash){
			return  callback(err,hash);
		});
	});
};
module.exports.check=function(password,hash,callback) {
	bcrypt.compare(password,hash,function(err,result){
		
		return callback(err,result);
	});
}
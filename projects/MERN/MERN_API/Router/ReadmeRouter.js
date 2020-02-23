const router=require('express').Router();
const verify = require('../Controller/User/VerificationController');
const config= require('../Config/config');
router.get('/', function(req,res) {
	return res.sendFile(config.dirname+'/readme.html');
});


module.exports= router;
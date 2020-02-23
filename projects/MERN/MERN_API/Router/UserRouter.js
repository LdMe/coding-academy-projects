const router=require('express').Router();
const UserEditController = require('../Controller/User/UserEditController');
const VerificationController = require('../Controller/User/VerificationController');
const verify = require('../Controller/User/VerificationController');

router.post('/user/edit',verify,function(req,res) {
	return UserEditController.edit(req,res);
});

module.exports= router;
const router=require('express').Router();
const LoginController = require('../Controller/User/LoginController');
const LogoutController = require('../Controller/User/LogoutController');
const RegisterController = require('../Controller/User/RegisterController');
const VerificationController = require('../Controller/User/VerificationController');
const RoleController = require('../Controller/User/RoleController');
const verify = require('../Controller/User/VerificationController');

router.get('/logout', function(req,res) {
	return LogoutController.logout(req,res);
});
router.post('/login',function(req,res) {
	return LoginController.login(req,res);
});
router.get('/register', function(req,res) {
	return RegisterController.showForm(req,res);
});
router.post('/register', function(req,res) {
	return RegisterController.register(req,res);
});
router.get('/verify',verify, function(req,res) {
	return RoleController(req,res);
});
module.exports= router;
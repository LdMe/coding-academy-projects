const router=require('express').Router();
const OrderCreateController = require('../Controller/Order/OrderCreateController');
const OrderEditController = require('../Controller/Order/OrderEditController');
const OrderShowController = require('../Controller/Order/OrderShowController');

const verify = require('../Controller/User/VerificationController');

router.get('/order', function(req,res) {
	return OrderShowController.showAll(req,res);
});

router.post('/order/add',verify, function(req,res) {
	return OrderCreateController.create(req,res);
});

router.post('/order/edit',verify, function(req,res) {
	return OrderEditController.edit(req,res);
});

router.get('/order/show/*', function(req,res) {
	return OrderShowController.show(req,res);
});
router.post('/order/delete',verify, function(req,res) {
	return OrderEditController.delete(req,res);
});
module.exports= router;
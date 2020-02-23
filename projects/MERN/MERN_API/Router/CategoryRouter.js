const router=require('express').Router();
const CategoryCreateController = require('../Controller/Category/CategoryCreateController');
const CategoryEditController = require('../Controller/Category/CategoryEditController');
const CategoryShowController = require('../Controller/Category/CategoryShowController');
const verify = require('../Controller/User/VerificationController');

router.get('/category', function(req,res) {
	return CategoryShowController.showAll(req,res);
});
router.get('/category/show/*', function(req,res) {
	return CategoryShowController.show(req,res);
});
router.post('/category/add',verify,function(req,res) {
	return CategoryCreateController.create(req,res);
});

router.post('/category/edit',verify, function(req,res) {
	return CategoryEditController.edit(req,res);
});
router.post('/category/delete',verify, function(req,res) {
	return CategoryEditController.delete(req,res);
});

module.exports= router;
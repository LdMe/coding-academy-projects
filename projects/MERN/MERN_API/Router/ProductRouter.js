const router=require('express').Router();
const ProductCreateController = require('../Controller/Product/ProductCreateController');
const ProductEditController = require('../Controller/Product/ProductEditController');
const ProductShowController = require('../Controller/Product/ProductShowController');
const imageShowController = require('../Controller/Image/ImageShowController');
const verify = require('../Controller/User/VerificationController');
const upload = require('../Controller/Image/ProductImageUploadController').upload;
router.get('/product', function(req,res) {
	return ProductShowController.showAll(req,res);
});
router.get('/product/show/*', function(req,res) {
	return ProductShowController.show(req,res);
});
router.get('/images/products/*', function(req,res) {
	return imageShowController.showProduct(req,res);
});
router.post('/product/add',verify,upload.single('image'), function(req,res) {
	return ProductCreateController.create(req,res);
});
router.post('/product/edit',verify,upload.single('image'), function(req,res) {
	return ProductEditController.edit(req,res);
});
router.post('/product/delete',verify, function(req,res) {
	return ProductEditController.delete(req,res);
});
module.exports= router;
const router=require('express').Router();
const PostCreateController = require('../Controller/Post/PostCreateController');
const PostEditController = require('../Controller/Post/PostEditController');
const PostShowController = require('../Controller/Post/PostShowController');
const imageShowController = require('../Controller/Image/ImageShowController');
const verify = require('../Controller/User/VerificationController');
const upload = require('../Controller/Image/PostImageUploadController').upload;
router.get('/post', function(req,res) {
	return PostShowController.showAll(req,res);
});
router.get('/post/show/*', function(req,res) {
	return PostShowController.show(req,res);
});
router.get('/images/posts/*', function(req,res) {
	return imageShowController.showPost(req,res);
});
router.post('/post/add',verify,upload.single('image'), function(req,res) {
	return PostCreateController.create(req,res);
});
router.post('/post/edit',verify,upload.single('image'), function(req,res) {
	return PostEditController.edit(req,res);
});
router.post('/post/delete',verify, function(req,res) {
	return PostEditController.delete(req,res);
});
module.exports= router;
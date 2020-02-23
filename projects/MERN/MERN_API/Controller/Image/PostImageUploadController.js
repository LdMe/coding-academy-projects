const multer = require("multer");
const path = require("path");
const post= require("../../Model/post");
const config = require('../../Config/config');
const uploadPath = config.uploadPath;
const fs = require('fs');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if(!req.session){
			cb("session not found",false);
		}
		let dir = "."+uploadPath  + req.session.username;
		fs.exists(dir,exist => {
			//user directory already exists
			if(!exist){
				fs.mkdir(dir, { recursive: true },(error) =>{
					dir=dir+"/posts";
					fs.mkdir(dir, { recursive: true },(error) =>{
						
						return cb(error,dir)
					});
				});
			}
			else{
				dir=dir+"/posts";
				fs.exists(dir,exist => {
					if(!exist){
						return fs.mkdir(dir, { recursive: true },(error) => cb(error,dir));
					}
					

					return cb(null,dir);
				});
			}
		});
	},

	filename: (req, file, cb) =>{
		let filename= req.body.title.split(" ").join("_").split(".")[0];

		cb(null, filename + '-' + Date.now()+path.extname(file.originalname))
	}
});
const upload = multer({
	storage: storage,
	fileFilter: function (req, file, callback) {
		
		var ext = path.extname(file.originalname);

		if(!file){
			console.log("not image");
			callback(null,false);
		}
		if(req.session.username != req.body.username){

			return callback(null,false);
		}
		if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {

			return callback(new Error('Only images are allowed'))
		}
		let new_post= {
			username : req.body.username,
			title : req.body.title,
		}

		let values= Object.values(new_post);
		for(let i= 0; i < values.length; i++){
			let value= values[i];

			if(!value || value==''){
				return callback(null,false)
			}
		}
		return callback(null,true);
	},
	limits:{
		fileSize: 1024 * 1024
	}
});

module.exports={upload:upload,uploadPath:uploadPath};
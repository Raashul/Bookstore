var mongoose 	= require('mongoose');
var Post = require('../datasets/posts.js');

var fs = require('fs-extra');
var path = require('path');

module.exports.postItem = function(req, res){


	var post = new Post(req.body);
	var file = req.files.file;



	var uploadDate = new Date().toISOString();
	uploadDate = uploadDate.replace(".", "");
	uploadDate = uploadDate.replace("-", "");
	uploadDate = uploadDate.replace(";", "");

	var tempPath = file.path;

	var savePath = "/uploads/" + post._id + uploadDate + file.name;

	//Create a unique target path to avoid collision
	var targetPath = path.join(__dirname, "../../uploads/" + post._id + uploadDate + file.name);

	console.log(targetPath);
	console.log(tempPath);

	fs.rename(tempPath, targetPath, function(err, data){
		if(err){
			res.send('There was an error uploading the file. Try Again Later');
			console.log("Error while uploading photo");
			console.log(err);
		}
		else{

			post.image = savePath;
			post.save(function(err){

				//console.log(err);
				if(err){
					console.log(err);
					res.send('There was an error. Please try again');
				}else{

				}

			});


		}
	})





}
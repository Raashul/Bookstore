var mongoose 	= require('mongoose');
var Post = require('../datasets/posts.js');

module.exports.postItem = function(req, res){

	var post = new Post(req.body);

	post.save(function(err){
		//console.log(err);
		res.send('There was an error. Please try again');
	});


}
var mongoose 	= require('mongoose');
var Post		= require('../datasets/posts');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports.getItemInfo = function(req, res){e
	//req.body will contain the Post ID

	//We will use this id to find the item in the database.

	var id = req.body;

	Post.findById(id.id, function(err, post){
		if(err){
			console.log(err);
			res.send(err);
		}else{

			res.json(post);

		}
	})


}



module.exports.sendEmailToSeller = function(req, res){
	//req.body will contain the Post ID

	//We will use this id to find the item in the database.

	var id = req.body;

	Post.findById(id.id, function(err, post){
		if(err){
			console.log(err);
			res.send(err);
		}else{

				var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth:{
			user:'rashul1996@gmail.com',
			pass: ''
		}
	});

	var mailOptions ={
		from: 'Sandesh <rashul1996@gmail.com>',
		to: 'rashul1996@gmail.com',
		subject: 'Website submission',
		text: 'You have new submission.. Name '

	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		}
		else{
			console.log('Message sent: ' + info.response);

		}

		transporter.close();

	});

		}
	})


}



var mongoose 	= require('mongoose');
var Post		= require('../datasets/posts');
var nodemailer = require('nodemailer');
var emailAuth =   require('../../app/config/auth.js');

module.exports.getItemInfo = function(req, res){
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



module.exports.sendEmail = function(req, res){

	console.log('here');
	//req.body will contain the Post ID

	//We will use this id to find the item in the database.

	var id = req.body;

	Post.findById(id.id, function(err, post){

		console.log(post);


		if(err){
			console.log(err);
			res.send(err);
		}else{

		var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth:{
			user: emailAuth.emailAuth.authEmail,
			pass: emailAuth.emailAuth.authPassword
		}
	});

	var mailOptions ={
		from: '<noreply@gmail.com>',
		to: 'test@gmail.com',
		subject: 'Regarding sale of ' + post.item_name,
		html: '<b>Thank you for using our application</b> <p>Please contact the seller using the given email Address</p>' + post.name + ":      " + post.email

	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		}
		else{
			console.log('Message sent: ' + info.response);

			res.json(mailOptions);

		}

		transporter.close();

	});

		}


	})


}



var express 						= require('express');
var mongoose 						= require('mongoose');
var bodyParser					= require('body-parser');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


var passport 						= require('passport');

//require('./app/config/passport.js')(passport);
require('./server/controllers/passport.js')(passport);



var multipart 					= require('connect-multiparty');
var multipartMiddleware	= multipart();


var get_post_controller 	= require('./server/controllers/get_item-controller');
var post_item_controller 	= require('./server/controllers/post_item_controller');
var get_post_info           = require('./server/controllers/get_item_info_controller');

var passport_controller		= require('./server/controllers/passport');



var app 									= express();


app.use(passport.initialize());
app.use(passport.session());


//This mongoose connecttion is for localhost
mongoose.connect('mongodb://localhost/book_rental');




app.use(bodyParser.json());
app.use(multipartMiddleware);

app.use('/app', express.static(__dirname + "/app"))
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/server', express.static(__dirname + '/server'));
app.use('/uploads', express.static(__dirname+"/uploads"));


app.get('/', function(req, res){
	res.sendfile('./index.html');
})


//All get requests
app.get('/api/home/getPosts', get_post_controller.getItem);

// app.get('/auth/facebook',
//   passport.authenticate('facebook'));

app.get('/auth/facebook',
	passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/login'
        }));


app.get('/auth/google',
  passport.authenticate('google', { scope:['profile', 'email']}));

app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/',
            failureRedirect : '/login'
        }));

// app.get('/api/test', function(req, res){
//     console.log('check');
//     res.send('testing');
// })



//All Post Requests.
app.post('/api/post_item', post_item_controller.postItem);
app.post('/api/info/get', get_post_info.getItemInfo);





app.listen('3000', function(){
	console.log('Listening in port 3000');
});



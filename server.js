var express 						= require('express');
var mongoose 						= require('mongoose');
var bodyParser					= require('body-parser');
var nodemailer          = require('nodemailer');
var passport 						= require('passport');

//require('./app/config/passport.js')(passport);
require('./server/controllers/passport.js')(passport);

var multipart 							= require('connect-multiparty');
var multipartMiddleware			= multipart();

var passport_controller     = require('./server/controllers/passport');

//Server Controller Files

var get_post_controller 						= require('./server/controllers/get_item-controller');
var post_item_controller 						= require('./server/controllers/post_item_controller');
var get_item_info_controller        = require('./server/controllers/get_item_info_controller');

var app 									= express();


//This mongoose connecttion is for localhost

//mongoose.connect('mongodb://localhost/book_rental');


//this mongoose connection is for heroku

mongoose.createConnection("mongodb://Rashuk:Password12@ds127399.mlab.com:27399/heroku_10kv355t");

mongoose.connect(process.env.MONGODB_URI, function(err){
	if(err){
		console.error(err);
	}else{
		console.log('success');
	}
})



app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

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

//GOOGLE AUTHENTICATION
app.get('/auth/google', passport.authenticate('google', { scope:['profile', 'email']}));

app.get('/auth/google/callback', passport.authenticate('google', {
	failureRedirect : '/login' }),

	function(req, res){

		var request = {
			email: req.user.google.email,
			name: req.user.google.name
		}

	//res.redirect('/post?id=58b1c638fe446305c8cc6b0d')
	//res.redirect('/#/user?name=sadasd&email=asdasd@asd.com');
	res.redirect("/#/user?name=" + request.name + "&email=" +request.email);

	// console.log(JSON.stringify(request));
	// return res.json(JSON.stringify(request));

	//res.redirect('/');
		//return done(JSON.stringify(request));
	});

//All Post Requests.
app.post('/api/post_item',  post_item_controller.postItem);
app.post('/api/info/get',  get_item_info_controller.getItemInfo);
app.post('/api/sendEmail', get_item_info_controller.sendEmail);
app.post('/api/post/category/', get_item_info_controller.getCategoryPost);

function isLoggedIn(req, res, next) {
	console.log('checking if logged in');
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
		return next();
	}

}
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



var express 						= require('express');
var mongoose 						= require('mongoose');
var bodyParser					= require('body-parser');
var passport 						= require('passport');

require('./app/config/passport.js')(passport);



var multipart 					= require('connect-multiparty');
var multipartMiddleware	= multipart();


var get_post_controller = require('./server/controllers/get_item-controller');

var post_item_controller = require('./server/controllers/post_item_controller');




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

app.get('/auth/facebook',
  passport.authenticate('facebook'));

 app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/login'
        }));

//All Post Requests.
app.post('/api/post_item', post_item_controller.postItem);




app.listen('3000', function(){
	console.log('Listening in port 3000');
});



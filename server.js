var express 						= require('express');
var mongoose 						= require('mongoose');
var bodyParser					= require('body-parser');
var multipart 					= require('connect-multiparty');
var multipartMiddleware	= multipart();


var get_post_controller = require('./server/controllers/get_item-controller');

var post_item_controller = require('./server/controllers/post_item_controller');



var app 									= express();


//This mongoose connecttion is for localhost
mongoose.connect('mongodb://localhost/book_rental');


app.use(bodyParser.json());
app.use(multipartMiddleware);

app.use('/app', express.static(__dirname + "/app"))
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', function(req, res){
	res.sendfile('./index.html');
})


//All get requests
app.get('/api/home/getPosts', get_post_controller.getItem);


//All Post Requests.
app.post('/api/post_item', post_item_controller.postItem);





app.listen('3000', function(){
	console.log('Listening in port 3000');
});


// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });


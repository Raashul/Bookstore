
var mongoose 		= require('mongoose');

module.exports = mongoose.model('Book_Rental_Users', {

	facebook :{
		name : String,

		token: String,

		id: String,

		username: String,

		email: String,
	}




});
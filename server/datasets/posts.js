var mongoose 		= require('mongoose');

module.exports = mongoose.model('Book_Rental', {

	name: String,

	email: String,

	item_name: String,

  item_text: String,

  item_price: Number,

  item_version: String,

  image: String,

  date : {type: Date, default: Date.now}

});
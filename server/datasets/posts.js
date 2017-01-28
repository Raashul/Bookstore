var mongoose 		= require('mongoose');

module.exports = mongoose.model('Book_Rental', {

	name: String,

	email: String,

	item_name: String,

  item_text: String,

  item_price: Number,

  date : {type: Date, default: Date.now}

});
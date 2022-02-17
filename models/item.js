const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'An item must have a name'],
		unique: true,
		trim: true
	},
	category: {
		type: String,
		required: [true, 'An item must belong to a category']
	},
	price: {
		type: Number,
		required: [true, 'An item must have a price']
	},
	available: {
		type: Boolean,
		default: true
	},
	photoUrl: {
		type: String,
		default: ''
	},
	ratings: {
		type: Number,
		min: [1, 'Rating must be above 1.0'],
		max: [5, 'Rating must be below 5.0']
		// set: val => Math.round(val * 10) / 10
	},
	ratingsQuantity: {
		type: Number,
		default: 0
	},
	priceDiscount: {
		type: Number,
		validate: {
			validator: function (val) {
				// this only points to the new document on NEW document creation
				return val < this.price;
			},
			message: 'Discount price ({VALUE}) should be below reglar price'
		},
		default: 0
	}
});

module.exports = mongoose.model('Item', itemSchema);

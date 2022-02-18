const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		body: {
			type: String,
			required: [true, 'A review must have a body']
		},
		item: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Item',
			required: [true, 'A review must belong to an item']
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'A review must belong to a user']
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Review', reviewSchema);

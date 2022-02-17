const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
	{
		item: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Item',
			required: [true, 'A cart must contain one item']
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'A cart must have a user']
		},
		quantity: {
			type: Number,
			default: 1
		}
	},
	{
		timestamps: true
	}
);

cartSchema.pre(/^find/, function (next) {
	this.populate({ path: 'item' });

	next();
});

module.exports = mongoose.model('Cart', cartSchema);

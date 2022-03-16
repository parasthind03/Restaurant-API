const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
	{
		item: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Item',
			required: [true]
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'A Purchase must have a user']
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

purchaseSchema.pre(/^find/, function (next) {
	this.populate({ path: 'item' });

	next();
});

module.exports = mongoose.model('Purchase', purchaseSchema);

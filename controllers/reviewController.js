const Review = require('../models/review');

exports.getAllReviews = async (req, res, next) => {
	try {
		const itemId = req.params.id;
		console.log(itemId);
		const reviews = await Review.find({ item: itemId }).populate({
			path: 'user',
			select: 'username'
		});

		console.log(reviews);

		res.status(200).json({
			status: 'success',
			totalReviews: reviews.length,
			reviews
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

exports.createReview = async (req, res, next) => {
	try {
		req.body.user = req.user.id;
		const review = await Review.create(req.body);

		res.status(200).json({
			status: 'success',
			review
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

exports.updateReview = async (req, res, next) => {
	try {
		const oldReview = await Review.findById(req.params.id);
		if (oldReview.user != req.user.id) {
			throw new Error('You can only edit your own reviews');
		}

		const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		});

		res.status(200).json({
			status: 'success',
			review
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

exports.deleteReview = async (req, res, next) => {
	try {
		const oldReview = await Review.findById(req.params.id);
		if (oldReview.user != req.user.id) {
			throw new Error('You can only delete your own reviews');
		}

		const review = await Review.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success'
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

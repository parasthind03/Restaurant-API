const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.createCheckoutSession = async (req, res, next) => {
	try {
		
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

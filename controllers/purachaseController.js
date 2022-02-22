const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const Cart = require('../models/cart');

exports.createCheckoutSession = async (req, res, next) => {
	try {
		const carts = await Cart.find({ user: req.user.id });

		let line_items = carts.map(cart => {
			return {
				name: cart.item.name,
				images: [cart.item.photoUrl],
				amount: (cart.item.price - cart.item.priceDiscount)*100,
				currency: 'inr',
				quantity: cart.quantity
			};
		});

		const url = process.env.FRONTEND_URL;

		const session = await stripe.checkout.sessions.create({
			mode: 'payment',
			line_items,
			customer_email: req.user.email,
			success_url: url,
			cancel_url: url,
			client_reference_id: req.user.id
		});

		res.status(200).send(session);
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};


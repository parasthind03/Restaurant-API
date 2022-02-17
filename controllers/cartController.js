const Cart = require('../models/cart');

exports.createCart = async (req, res, next) => {
	try {
		const itemId = req.params.itemId;
		const userId = req.user.id;
		let cart = await Cart.create({
			item: itemId,
			user: userId,
			quantity: req.body.quantity || 1
		});

		res.status(200).json({
			status: 'success',
			cart
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

exports.getCart = async (req, res, next) => {
	try {
		const carts = await Cart.find({ user: req.user.id });

		let totalPrice;
		carts.map(cart => {
			totalPrice = cart.item.price - cart.item.priceDiscount;
		});

		res.status(200).json({
			status: 'success',
			carts,
			totalPrice
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

exports.updateCart = async (req, res, next) => {
	try {
		const cart = await Cart.findOneAndUpdate(
			{
				item: req.params.itemId,
				user: req.user.id
			},
			{ quantity: +req.body.quantity },
			{ new: true }
		);

		res.status(200).json({
			status: success,
			cart
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

exports.deleteCart = async (req, res, next) => {
	try {
		const cart = await Cart.findOneAndDelete({
			item: req.params.itemId,
			user: req.user.id
		});

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

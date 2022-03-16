const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const User = require('../models/user');
const Cart = require('../models/cart');
const Purchase = require('../models/purchase');

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

exports.createPurchase = async (req, res, next) => {
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

// exports.getPurchase = async (req, res, next) => {
// 	try {
// 		const carts = await Cart.find({ user: req.user.id });

// 		let totalPrice = 0;
// 		carts.forEach(cart => {
// 			if (cart.item.priceDiscount)
// 				totalPrice +=
// 					(cart.item.price - cart.item.priceDiscount) * cart.quantity;
// 			else totalPrice += cart.item.price * cart.quantity;
// 		});

// 		res.status(200).json({
// 			status: 'success',
// 			carts,
// 			totalPrice
// 		});
// 	} catch (error) {
// 		res.status(400).json({
// 			status: 'fail',
// 			msg: error.message
// 		});
// 	}
// };

const createPurchaseCheckout = async session => {
  console.log("Session",session);
  // const tour = session.client_reference_id;
  // const user = (await User.findOne({ email: session.customer_email })).id;
  // const price = session.display_items[0].amount;
  // await Purchase.create({ tour, user, price });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  console.log(signature);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createPurchaseCheckout(event.data.object);

  res.status(200).json({ received: true });
};
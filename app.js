require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { connectDB } = require('./config/db');
const userRouter = require('./routes/user');
const itemRouter = require('./routes/item');
const cartRouter = require('./routes/cart');
const reviewRouter = require('./routes/review');

const app = express();

connectDB();
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/cart', cartRouter);
app.use('/review', reviewRouter);
app.get(
	'/payment',
	require('./controllers/purachaseController').getCheckoutSession
);

const port = process.env.port || 8000;
app.listen(port, res => {
	console.log(`Server running on port ${port}`);
});

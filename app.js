require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const { connectDB } = require('./config/db');
const userRouter = require('./routes/user');

const app = express();

connectDB();
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROUTES
app.use('/', userRouter);

const port = process.env.port || 8000;
app.listen(port, res => {
	console.log(`Server running on port ${port}`);
});

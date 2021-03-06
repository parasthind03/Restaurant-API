const User = require('../models/user');

exports.updateUser = async (req, res, next) => {
	try {
		if (req.user.id === req.params.id) {
			if (req.body.password) {
				req.body.password = await bcrypt.hash(req.body.password, 12);
			}

			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body
			});

			res.status(200).json({
				status: 'success',
				message: 'Your account has been updated!'
			});
		} else {
			throw new Error('You can update only your account');
		}
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndDelete(req.user.id);
		res.status(200).json({
			status: 'success',
			message: 'Your account has been deleted!'
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

exports.getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			throw new Error('There is no user with this id');
		}
		// console.log(user._doc);
		const { password, updatedAt, __v, ...others } = user._doc;
		res.status(200).json({
			status: 'success',
			others
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

exports.getCurrentUser = async (req, res, next) => {
	try {
		const user = req.user;
		res.status(200).json({
			status: 'success',
			user
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

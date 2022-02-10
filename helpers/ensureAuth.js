exports.ensureAuth = async (req, res, next) => {
	try {
		if (req.user.isAdmin) {
			next();
		} else {
			throw new Error('You cannot perform this action.');
		}
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

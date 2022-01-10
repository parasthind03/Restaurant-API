const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: [true, 'Please provide a name']
		},
		email: {
			type: String,
			unique: true,
			match: [
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
				'Please enter a valid email address'
			],
			required: [true, 'Please provide an email']
		},
		password: {
			type: String,
			minlength: 8,
			required: [true, 'Please provide a password'],
      select: false
		},
		//Optional
		passwordConfirm: {
			type: String,
			validate: {
				// This only works on CREATE and SAVE!!!
				validator: function (el) {
					return el === this.password;
				},
				message: 'Passwords are not the same!'
			},
		},
		isAdmin: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) next();

	this.password = await bcrypt.hash(this.password, 12);

	this.passwordConfirm = undefined;
  next()
});

userSchema.methods.verifyPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);

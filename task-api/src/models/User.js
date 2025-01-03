// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'You need to add username'],
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false, // Don't return password in queries
	},
	imgUrl: {
		type: String,
		default: null,
	},
});

module.exports = mongoose.model('User', userSchema);

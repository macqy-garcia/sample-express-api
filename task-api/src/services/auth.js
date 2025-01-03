const User = require('../models/User');

class AuthService {
	static async loginUser(username, password) {
		const skip = (page - 1) * limit;

		const users = await User.find()
			.select('-password')
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });

		const totalPages = Math.ceil(totalUsers / limit);

		return {
			user,
			message,
		};
	}
	static async logoutUser(username, password) {
		const skip = (page - 1) * limit;

		const users = await User.find()
			.select('-password')
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });

		const totalPages = Math.ceil(totalUsers / limit);

		return {
			user,
			message,
		};
	}
}

module.exports = { UserService };

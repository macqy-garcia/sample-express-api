const User = require('../models/User');

class UserService {
	static async getPaginatedUsers(page, limit) {
		const skip = (page - 1) * limit;
		const totalUsers = await User.countDocuments();

		const users = await User.find()
			.select('-password')
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });

		const totalPages = Math.ceil(totalUsers / limit);

		return {
			users,
			pagination: {
				total: totalUsers,
				totalPages,
				currentPage: page,
				perPage: limit,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1,
				nextPage: page < totalPages ? page + 1 : null,
				prevPage: page > 1 ? page - 1 : null,
			},
		};
	}

	static async getUserById(id) {
		return User.findById(id).select('-password');
	}

	static async createUser(userData) {
		const user = await User.create(userData);
		const userResponse = user.toObject();
		delete userResponse.password;
		return userResponse;
	}

	static async deleteUser(id) {
		const user = await User.findById(id);
		if (!user) return null;

		await User.deleteOne({ _id: id });
		return true;
	}
}

module.exports = { UserService };

const { SALT_ROUNDS } = require('../../config/constant');
const { UserService } = require('../../services/users');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
	try {
		const { page = 1, limit = 10 } = req.query;
		const result = await UserService.getPaginatedUsers(
			parseInt(page),
			parseInt(limit),
		);

		res.json({
			message: 'Success Retrieval',
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error retrieving users',
			error: error.message,
		});
	}
};

const getUserById = async (req, res) => {
	try {
		const user = await UserService.getUserById(req.params.id);

		if (!user) {
			return res.status(404).json({ message: 'No user found' });
		}

		res.json({ message: 'Success Retrieval', user });
	} catch (error) {
		res.status(500).json({
			message: 'Error retrieving user',
			error: error.message,
		});
	}
};

const createUser = async (req, res) => {
	try {
		const { password, ...userData } = req.body;
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		const userWithImage = {
			...userData,
			password: hashedPassword,
			imgUrl: req.file ? `/resources/${req.file.filename}` : null,
		};

		const user = await UserService.createUser(userWithImage);
		res.status(201).json({
			message: 'User created successfully!',
			user,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error creating user',
			error: error.message,
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		const deleted = await UserService.deleteUser(req.params.id);

		if (!deleted) {
			return res.status(404).json({ message: 'No user found' });
		}

		res.json({ message: 'Success Deletion' });
	} catch (error) {
		res.status(500).json({
			message: 'Error deleting user',
			error: error.message,
		});
	}
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	deleteUser,
};

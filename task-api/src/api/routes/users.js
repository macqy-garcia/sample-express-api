const express = require('express');
const { upload } = require('../../config/upload');
const {
	getUsers,
	getUserById,
	createUser,
	deleteUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', upload.single('image'), createUser);
router.delete('/:id', deleteUser);

module.exports = router;

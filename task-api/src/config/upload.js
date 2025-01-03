const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createDirectory } = require('../utils/fileSystem');

// Constants for upload configuration
const UPLOAD_CONFIG = {
	UPLOAD_PATH: 'resources',
	MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
	ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
};

// Ensure upload directory exists
createDirectory(UPLOAD_CONFIG.UPLOAD_PATH);

// Custom error handling for multer
class UploadError extends Error {
	constructor(message, code = 'UPLOAD_ERROR') {
		super(message);
		this.code = code;
	}
}

// Storage configuration
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, UPLOAD_CONFIG.UPLOAD_PATH);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		const fileExtension = path.extname(file.originalname).toLowerCase();
		const sanitizedFilename = `${uniqueSuffix}${fileExtension}`;
		cb(null, sanitizedFilename);
	},
});

// File filter with detailed validation
const fileFilter = (req, file, cb) => {
	// Check mime type
	if (!UPLOAD_CONFIG.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
		return cb(
			new UploadError(
				`Invalid file type. Allowed types: ${UPLOAD_CONFIG.ALLOWED_MIME_TYPES.join(
					', ',
				)}`,
				'INVALID_FILE_TYPE',
			),
			false,
		);
	}

	// Additional security checks
	const ext = path.extname(file.originalname).toLowerCase();
	if (!['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
		return cb(
			new UploadError('Invalid file extension', 'INVALID_FILE_EXTENSION'),
			false,
		);
	}

	cb(null, true);
};

// Create multer instance
const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: UPLOAD_CONFIG.MAX_FILE_SIZE,
		files: 1, // Maximum number of files per upload
	},
});

// Error handler middleware for upload
const handleUploadError = (error, req, res, next) => {
	if (error instanceof multer.MulterError) {
		switch (error.code) {
			case 'LIMIT_FILE_SIZE':
				return res.status(400).json({
					status: 'error',
					code: 'FILE_TOO_LARGE',
					message: `File size should be less than ${
						UPLOAD_CONFIG.MAX_FILE_SIZE / (1024 * 1024)
					}MB`,
				});
			case 'LIMIT_FILE_COUNT':
				return res.status(400).json({
					status: 'error',
					code: 'TOO_MANY_FILES',
					message: 'Too many files uploaded',
				});
			default:
				return res.status(400).json({
					status: 'error',
					code: error.code,
					message: 'File upload error',
				});
		}
	}

	if (error instanceof UploadError) {
		return res.status(400).json({
			status: 'error',
			code: error.code,
			message: error.message,
		});
	}

	next(error);
};

// Helper function to delete uploaded file
const deleteUploadedFile = async (filename) => {
	const filepath = path.join(UPLOAD_CONFIG.UPLOAD_PATH, filename);
	try {
		if (fs.existsSync(filepath)) {
			await fs.promises.unlink(filepath);
		}
	} catch (error) {
		console.error(`Error deleting file ${filepath}:`, error);
	}
};

module.exports = {
	upload,
	handleUploadError,
	deleteUploadedFile,
	UPLOAD_CONFIG,
};

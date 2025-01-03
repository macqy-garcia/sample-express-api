// src/api/routes/index.js
const express = require('express');
const userRoutes = require('./users');
// const authRoutes = require('./auth');
// const resourceRoutes = require('./resources');

const router = express.Router();

// API Version and Documentation
router.get('/', (req, res) => {
	res.status(200).json({
		version: '1.0.0',
		documentation: '/api/docs',
		endpoints: {
			users: '/api/users',
			auth: '/api/auth',
			resources: '/api/resources',
		},
	});
});

// Route Registration
router.use('/users', userRoutes);
// router.use('/auth', authRoutes);
// router.use('/resources', resourceRoutes);

// 404 Handler for undefined routes
router.use('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `Cannot ${req.method} ${req.originalUrl}`,
		suggestions: [
			'Check the URL and try again',
			'Refer to the API documentation for valid endpoints',
			'Contact support if you believe this is a mistake',
		],
	});
});

// Error Handler
router.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
		error: process.env.NODE_ENV === 'development' ? err.message : undefined,
	});
});

module.exports = router;

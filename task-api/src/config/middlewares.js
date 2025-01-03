const express = require('express');
const fs = require('fs');

const setupMiddlewares = (app) => {
	app.use(express.json());

	// Create resources directory if it doesn't exist
	if (!fs.existsSync('./resources')) {
		fs.mkdirSync('./resources');
	}
};

module.exports = { setupMiddlewares };

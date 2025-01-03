const fs = require('fs');

const createDirectory = (dirPath) => {
	try {
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}
	} catch (error) {
		console.error(`Error creating directory ${dirPath}:`, error);
		throw error;
	}
};

module.exports = {
	createDirectory,
};

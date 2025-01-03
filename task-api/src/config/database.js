// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		// Your MongoDB connection string
		// For local MongoDB: 'mongodb://localhost:27017/your_database'
		// For MongoDB Atlas: 'mongodb+srv://username:password@cluster.mongodb.net/your_database'
		const mongoURI =
			process.env.MONGODB_URI ||
			'mongodb+srv://macqy:eYmWHic2D7ikmVC@cluster0.g6cv1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

		const conn = await mongoose.connect(mongoURI, {
			// These are included by default in Mongoose 6+
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error('MongoDB connection error:', error.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;

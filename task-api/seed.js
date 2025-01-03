const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const connectDB = require('./config/database');
const User = require('./models/User');

const SALT_ROUNDS = 10;
const TOTAL_USERS = 100;

async function seedUsers() {
	try {
		// Connect to database
		await connectDB();

		// Clear existing users
		await User.deleteMany({});
		console.log('Cleared existing users');

		// Create array to hold user data
		const users = [];

		// Generate 100 fake users
		for (let i = 0; i < TOTAL_USERS; i++) {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();

			const userData = {
				username: faker.internet.userName({ firstName, lastName }),
				email: faker.internet.email({ firstName, lastName }),
				password: await bcrypt.hash('password123', SALT_ROUNDS), // Default password for all seeded users
				// Add any additional fields your User model has
			};

			users.push(userData);
		}

		// Insert all users at once
		const createdUsers = await User.insertMany(users);
		console.log(`Successfully seeded ${createdUsers.length} users`);

		// Log a few users as example
		console.log('\nExample of created users:');
		console.log(
			createdUsers.slice(0, 3).map((user) => ({
				username: user.username,
				email: user.email,
			})),
		);
	} catch (error) {
		console.error('Error seeding users:', error);
	} finally {
		// Disconnect from database
		process.exit();
	}
}

// Run the seeder
seedUsers();

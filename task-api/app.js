const express = require('express');
const connectDB = require('./src/config/database');
const { setupMiddlewares } = require('./src/config/middlewares');
const routes = require('./src/api/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Setup global middlewares
setupMiddlewares(app);

// Setup routes
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

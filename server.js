const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const userRoutes = require('./routers/userRoute');
const connectDB = require('./db/db')
require('dotenv').config();

const app = express();
connectDB()
// Middleware
app.use(express.json());
// Routes
app.use('/api', userRoutes);
// Start server
const port = config.port;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
module.exports = app;

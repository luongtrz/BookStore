// app.js
const express = require('express');
const applyCorsMiddleware = require('./middlewares/corsMiddleware');
const bookRoutes = require('./components/books/bookRoutes');
const userRoutes = require('./components/users/userRoutes');

const app = express();
applyCorsMiddleware(app);
app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

module.exports = app;

// database.js
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb+srv://luongtrz:luongtrzpass@book.hrsim.mongodb.net/BookStore';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

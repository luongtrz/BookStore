// config/database.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://luongtrz:luongtrzpass@book.hrsim.mongodb.net/BookStore';
let db;

async function connectToDatabase() {
  if (!db) {
    const client = new MongoClient(uri);  // Không cần `useNewUrlParser` và `useUnifiedTopology`
    await client.connect();
    db = client.db('BookStore');
    console.log('Connected to MongoDB Atlas');
  }
  return db;
}

module.exports = connectToDatabase;

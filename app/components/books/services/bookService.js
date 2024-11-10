// components/books/services/bookService.js
const connectToDatabase = require('../../../config/database');

async function getAllBooks() {
  const db = await connectToDatabase();
  return await db.collection('books').find().toArray();
}

async function getBookById(id) {
  const db = await connectToDatabase();
  return await db.collection('books').findOne({ id });
}

async function getGenres() {
  const db = await connectToDatabase();
  return await db.collection('books').distinct('genre');
}

module.exports = {
  getAllBooks,
  getBookById,
  getGenres,
};

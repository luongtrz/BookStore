// components/books/services/bookService.js
const Book = require('../../../models/Book');

const getAllBooks = async () => {
  return await Book.find();
};

const getBookById = async (id) => {
  return await Book.findOne({ id });
};

const getGenres = async () => {
  return await Book.distinct('genre');
};

module.exports = {
  getAllBooks,
  getBookById,
  getGenres
};

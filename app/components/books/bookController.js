// components/books/bookController.js
const bookService = require('./services/bookService');

const getBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};

const getGenres = async (req, res) => {
  try {
    const genres = await bookService.getGenres();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching genres', error: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  getGenres
};

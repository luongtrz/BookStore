// components/books/bookController.js
const bookService = require('./services/bookService');

exports.getBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (book) res.send(book);
    else res.status(404).send({ message: 'Book not found' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getGenres = async (req, res) => {
  try {
    const genres = await bookService.getGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

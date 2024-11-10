// components/books/bookRoutes.js
const express = require('express');
const { getBooks, getBookById, getGenres } = require('./bookController');

const router = express.Router();

router.get('/genres', getGenres); // Route để lấy danh sách thể loại
router.get('/', getBooks);
router.get('/:id', getBookById); // Route động đặt sau

module.exports = router;

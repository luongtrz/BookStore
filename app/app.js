const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();

// Middleware cho phép gọi API từ các origin khác nhau
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'");
  next();
});

// Xử lý JSON từ request body
app.use(express.json());

// Chuỗi kết nối MongoDB từ biến môi trường
const uri = process.env.MONGODB_URI || 'mongodb+srv://luongtrz:luongtrzpass@book.hrsim.mongodb.net/BookStore';
let db;

// Kết nối MongoDB
async function connectToDatabase() {
  if (!db) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('BookStore');
    console.log('Connected to MongoDB Atlas');
  }
}

// Middleware để kết nối MongoDB trước khi xử lý request
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route lấy danh sách sách
app.get('/books', async (req, res) => {
  try {
    const books = await db.collection('books').find().toArray();
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route lấy sách theo custom id
app.get('/books/:id', async (req, res) => {
  try {
    const book = await db.collection('books').findOne({ id: req.params.id });
    if (book) {
      res.send(book);
    } else {
      res.status(404).send({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route lấy danh sách các thể loại từ collection 'books'
app.get('/genres', async (req, res) => {
  try {
    const genres = await db.collection('books').distinct('genre');
    res.status(200).json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Route đăng ký
app.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const newUser = { fullName, email, password };
    await db.collection('users').insertOne(newUser);
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});

module.exports = app;
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();

// Middleware cho phép gọi API từ các origin khác nhau
app.use(cors());

// Middleware bảo mật header
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'");
  next();
});

// Chuỗi kết nối MongoDB
const uri = 'mongodb+srv://luongtrz:luongtrzpass@book.hrsim.mongodb.net/BookStore?retryWrites=true&w=majority';
const client = new MongoClient(uri);

let db;

// Hàm kết nối MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('BookStore');
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

// Kết nối MongoDB khi server khởi động
connectToDatabase();

// Route lấy danh sách sách
app.get('/books', async (req, res) => {
  if (!db) {
    return res.status(500).send({ message: 'Database not connected' });
  }

  try {
    const books = await db.collection('books').find().toArray();
    res.send(books);
    console.log(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send({ message: "Error fetching books", error: error.message });
  }
});

// Route lấy sách theo custom id
app.get('/books/:id', async (req, res) => {
  if (!db) {
    return res.status(500).send({ message: 'Database not connected' });
  }

  try {
    const book = await db.collection('books').findOne({ id: req.params.id });
    if (book) {
      res.send(book);
    } else {
      res.status(404).send({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error fetching book by id:', error);
    res.status(500).send({ message: "Error fetching book by id", error: error.message });
  }
});

// Route lấy danh sách các thể loại từ collection 'books'
app.get('/genres', async (req, res) => {
  if (!db) {
    return res.status(500).send({ message: 'Database not connected' });
  }

  try {
    const genres = await db.collection('books').distinct('genre'); // Lấy tất cả các thể loại không trùng lặp
    res.status(200).send(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

// Xử lý JSON từ request body
app.use(express.json());

// Route đăng ký
app.post('/register', async (req, res) => {
  if (!db) {
    return res.status(500).send({ message: 'Database not connected' });
  }

  const { fullName, email, password } = req.body;
  console.log(req.body);

  try {
    // Kiểm tra nếu email đã tồn tại
    console.log("Email đang kiểm tra:", email);

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Tạo mới người dùng và lưu vào database
    const newUser = {
      fullName,
      email,
      password
    };
    await db.collection('users').insertOne(newUser);

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
});

// Khởi động server
const PORT = process.env.PORT || 5000;

// // open comment to run on local
// app.listen(PORT, () => {
//   console.log(`Server is running on port http://127.0.0.1:${PORT}`);
// });

module.exports = app;

const express = require('express');
const cors = require('cors');
const { MongoClient} = require('mongodb');

const app = express();

// Middleware cho phép gọi API từ các origin khác nhau
app.use(cors());


app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'");
  next();
});

// ----------------------bảo mật dữ liệu---------------------------
// require('dotenv').config(); // Thêm dòng này để nạp các biến môi trường

// // Lấy chuỗi kết nối từ biến môi trường
// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);
// -------------------------------------------------

// Chuỗi kết nối MongoDB
const uri = 'mongodb+srv://luongtrz:luongtrzpass@book.hrsim.mongodb.net/BookStore?retryWrites=true&w=majority';
const client = new MongoClient(uri);

let db;

client.connect()
  .then(() => {
    db = client.db('BookStore');
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Route lấy danh sách sách
app.get('/books', async (req, res) => {
  try {
    const books = await db.collection('books').find().toArray();
    res.send(books);
    console.log(books);
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
    const genres = await db.collection('books').distinct('genre'); // Lấy tất cả các thể loại không trùng lặp
    res.send(genres);
  } catch (error) {
    res.status(500).send(error);
  }
});



// Xử lý JSON từ request body
app.use(express.json());

// Route đăng ký
app.post('/register', async (req, res) => {
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
      console.error(error);
      res.status(500).json({ message: "Có lỗi xảy ra" });
  }
});


// Khởi động server
const PORT = process.env.PORT || 5000;

//open comment to run on local
// app.listen(PORT, () => {
//   console.log(`Server is running on port http://127.0.0.1:${PORT}`);
// });

module.exports = app;
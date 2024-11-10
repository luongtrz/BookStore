// components/users/userController.js
const userService = require('./services/userService');

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "Email đã tồn tại" });
    
    const newUser = { fullName, email, password };
    await userService.registerUser(newUser);
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};

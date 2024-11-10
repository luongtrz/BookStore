// components/users/userController.js
const userService = require('./services/userService');

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newUser = await userService.registerUser({ fullName, email, password });
    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

module.exports = {
  registerUser
};

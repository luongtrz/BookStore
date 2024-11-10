// components/users/services/userService.js
const connectToDatabase = require('../../../config/database');

async function findUserByEmail(email) {
  const db = await connectToDatabase();
  return await db.collection('users').findOne({ email });
}

async function registerUser(newUser) {
  const db = await connectToDatabase();
  await db.collection('users').insertOne(newUser);
}

module.exports = {
  findUserByEmail,
  registerUser,
};

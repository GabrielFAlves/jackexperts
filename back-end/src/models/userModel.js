const connection = require("../connection");
const bcrypt = require("bcryptjs");

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const dateUTC = new Date(Date.now()).toUTCString();
  const query =
    "INSERT INTO users (email, password, created_at) VALUES (?, ?, ?)";
  await connection.execute(query, [email, hashedPassword, dateUTC]);
};

const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await connection.execute(query, [email]);
  return rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
};

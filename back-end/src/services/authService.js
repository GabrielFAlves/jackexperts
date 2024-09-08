const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password) => password.length >= 6;

const registerUser = async (email, password) => {
  if (!validateEmail(email) || !validatePassword(password)) {
    throw new Error("Email ou senha inválidos");
  }

  const userExists = await userModel.getUserByEmail(email);
  if (userExists) {
    throw new Error("Usuário já existe");
  }

  await userModel.createUser(email, password);
};

const loginUser = async (email, password) => {
  const user = await userModel.getUserByEmail(email);
  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Token inválido");
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
};

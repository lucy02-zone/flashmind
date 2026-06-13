// src/services/authService.js

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const registerUser = async (
  name,
  email,
  password
) => {

  const existingUser =
    await User.findUserByEmail(email);

  if (existingUser) {
    throw new Error(
      "Email already registered"
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const userId =
    await User.createUser(
      name,
      email,
      hashedPassword
    );

  return userId;
};

const loginUser = async (
  email,
  password
) => {

  const user =
    await User.findUserByEmail(email);

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser
};
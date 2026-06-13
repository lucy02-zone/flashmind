// src/controllers/authController.js

const { validationResult } = require("express-validator");

const {
  registerUser,
  loginUser
} = require("../services/authService");

const User = require("../models/User");

const generateToken = require("../utils/tokenGenerator");

const register = async (
  req,
  res,
  next
) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      password
    } = req.body;

    const userId = await registerUser(
      name,
      email,
      password
    );

    res.status(201).json({
      success: true,
      userId
    });

  } catch (error) {
    next(error);
  }
};

const login = async (
  req,
  res,
  next
) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      email,
      password
    } = req.body;

    const user = await loginUser(
      email,
      password
    );

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      token
    });

  } catch (error) {
    next(error);
  }
};

const getProfile = async (
  req,
  res,
  next
) => {
  try {

    const user = await User.findUserById(
      req.user.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile
};
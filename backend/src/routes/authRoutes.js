// src/routes/authRoutes.js

const express = require("express");

const {
  register,
  login,
  getProfile
} = require("../controllers/authController");

const {
  registerValidator,
  loginValidator
} = require("../validators/authValidators");

const protect =
  require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  register
);

router.post(
  "/login",
  loginValidator,
  login
);

router.get(
  "/me",
  protect,
  getProfile
);

module.exports = router;
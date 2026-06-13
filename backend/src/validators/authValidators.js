// src/validators/authValidators.js

const {
  body
} = require("express-validator");

const registerValidator = [
  body("name")
    .notEmpty(),

  body("email")
    .isEmail(),

  body("password")
    .isLength({ min: 6 })
];

const loginValidator = [
  body("email")
    .isEmail(),

  body("password")
    .notEmpty()
];

module.exports = {
  registerValidator,
  loginValidator
};
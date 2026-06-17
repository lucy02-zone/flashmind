const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { getQuizzes } = require("../controllers/quizController");

const router = express.Router();

router.get("/", protect, getQuizzes);

module.exports = router;

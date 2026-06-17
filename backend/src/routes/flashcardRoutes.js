const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { getFlashcards } = require("../controllers/flashcardController");

const router = express.Router();

router.get("/", protect, getFlashcards);

module.exports = router;

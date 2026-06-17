const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { getSummaries } = require("../controllers/summaryController");

const router = express.Router();

router.get("/", protect, getSummaries);

module.exports = router;

const express = require("express");

const {
  checkDatabase
} = require("../controllers/databaseController");

const router = express.Router();

router.get("/", checkDatabase);

module.exports = router;
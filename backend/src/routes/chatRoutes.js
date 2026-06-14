const express =
  require("express");

const protect =
  require(
    "../middlewares/authMiddleware"
  );

const {
  chatWithNotes
} = require(
  "../controllers/chatController"
);

const router =
  express.Router();

router.post(
  "/",
  protect,
  chatWithNotes
);

router.get(
  "/",
  (req, res) => {
    res.json({
      success: true,
      message: "Chat route working"
    });
  }
);

module.exports =
  router;
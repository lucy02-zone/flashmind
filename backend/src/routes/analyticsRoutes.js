const express =
  require("express");

const protect =
  require(
    "../middlewares/authMiddleware"
  );

const {
  fetchAnalytics
} = require(
  "../controllers/analyticsController"
);

const router =
  express.Router();

router.get(
  "/",
  protect,
  fetchAnalytics
);

module.exports =
  router;
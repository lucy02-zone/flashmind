const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const notFound = require("./middlewares/notFoundMiddleware");
const errorHandler = require("./middlewares/errorMiddleware");

const healthRoutes = require("./routes/healthRoutes");

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/api/health", healthRoutes);
const databaseRoutes =
  require("./routes/databaseRoutes");

app.use(
  "/api/database",
  databaseRoutes
);
const authRoutes =
require("./routes/authRoutes");

app.use(
  "/api/auth",
  authRoutes
);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
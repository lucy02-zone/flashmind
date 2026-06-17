const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const notFound = require("./middlewares/notFoundMiddleware");
const errorHandler = require("./middlewares/errorMiddleware");

const healthRoutes = require("./routes/healthRoutes");
const databaseRoutes = require("./routes/databaseRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const quizRoutes = require("./routes/quizRoutes");
const chatRoutes = require("./routes/chatRoutes");





const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/api/health", healthRoutes);
app.use("/api/database", databaseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/summaries", summaryRoutes);
app.use("/api/quizzes", quizRoutes);
app.use(
  "/api/analytics",
  analyticsRoutes
);
app.use(
  "/api/chat",
  chatRoutes
);


app.use(notFound);
app.use(errorHandler);

module.exports = app;
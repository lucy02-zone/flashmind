require("dotenv").config();

const app = require("./app");
const config = require("./config");
const logger = require("./config/logger");

app.listen(config.port, () => {
  logger(
    `Server running on port ${config.port}`
  );
});
const {
  testDatabaseConnection
} = require("../services/databaseService");

const checkDatabase = async (req, res, next) => {
  try {
    const result =
      await testDatabaseConnection();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkDatabase
};
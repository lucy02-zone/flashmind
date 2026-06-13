const pool = require("../config/database");

const testDatabaseConnection = async () => {
  const connection = await pool.getConnection();

  try {
    await connection.ping();

    return {
      success: true,
      message: "Database Connected"
    };
  } finally {
    connection.release();
  }
};

module.exports = {
  testDatabaseConnection
};
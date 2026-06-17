const pool = require("../config/database");

const getFilesForUser = async (userId) => {
  const [rows] = await pool.execute(
    `
      SELECT id, user_id, file_name, file_type, file_path
      FROM files
      WHERE user_id = ?
      ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};

module.exports = {
  getFilesForUser
};

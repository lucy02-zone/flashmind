const pool =
  require("../config/database");

const createFile = async (
  userId,
  fileName,
  fileType,
  fileSize,
  filePath
) => {

  const [result] =
    await pool.execute(
      `
      INSERT INTO files
      (
        user_id,
        file_name,
        file_type,
        file_size,
        file_path
      )
      VALUES (?,?,?,?,?)
      `,
      [
        userId,
        fileName,
        fileType,
        fileSize,
        filePath
      ]
    );

  return result.insertId;
};

const getLatestFileForUser = async (userId) => {
  const [rows] = await pool.execute(
    `
      SELECT *
      FROM files
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 1
    `,
    [userId]
  );

  return rows[0] || null;
};

module.exports = {
  createFile,
  getLatestFileForUser
};
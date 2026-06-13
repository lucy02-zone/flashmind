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

module.exports = {
  createFile
};
const File =
  require("../models/fileModel");

const saveFileMetadata =
  async (
    userId,
    file
  ) => {

    return await File.createFile(
      userId,
      file.originalname,
      file.mimetype,
      file.size,
      file.path
    );

  };

module.exports = {
  saveFileMetadata
};
const {
  saveFileMetadata
} = require("../services/uploadService");
const {
  getFilesForUser
} = require("../services/summaryDataService");

const uploadFile = async (
  req,
  res,
  next
) => {
  try {

    console.log("req.file =", req.file);
    console.log("req.body =", req.body);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const fileId =
      await saveFileMetadata(
        req.user.id,
        req.file
      );

    res.status(201).json({
      success: true,
      fileId,
      file: req.file.filename
    });

  } catch (error) {
    next(error);
  }
};

const getUserFiles = async (
  req,
  res,
  next
) => {
  try {
    const files = await getFilesForUser(req.user.id);
    res.json({ success: true, files });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
  getUserFiles
};
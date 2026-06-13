const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      file.originalname;

    cb(null, uniqueName);
  }
});

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [
    ".pdf",
    ".docx",
    ".pptx",
    ".txt"
  ];

  const ext =
    path.extname(
      file.originalname
    ).toLowerCase();

  if (
    allowedTypes.includes(ext)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type"
      ),
      false
    );
  }

};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize:
      10 * 1024 * 1024
  }
});

module.exports = upload;
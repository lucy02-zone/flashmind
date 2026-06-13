const path = require("path");

const {
  extractPdfText
} = require("./pdfService");

const {
  extractDocxText
} = require("./docxService");

const {
  extractTxtText
} = require("./txtService");

const {
  extractPptxText
} = require("./pptxService");

const extractText = async (
  filePath
) => {

  const ext =
    path.extname(filePath)
      .toLowerCase();

  switch (ext) {

    case ".pdf":
      return await extractPdfText(
        filePath
      );

    case ".docx":
      return await extractDocxText(
        filePath
      );

    case ".txt":
      return await extractTxtText(
        filePath
      );

    case ".pptx":
      return await extractPptxText(
        filePath
      );

    default:
      throw new Error(
        "Unsupported file type"
      );
  }
};

module.exports = {
  extractText
};
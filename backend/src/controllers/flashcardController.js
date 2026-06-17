const {
  getFileById
} = require("../services/summaryDataService");
const {
  extractText
} = require("../services/textExtractionService");
const {
  generateFlashcards
} = require("../services/flashcardService");

const getFlashcards = async (
  req,
  res,
  next
) => {
  try {
    const { fileId } = req.query;

    if (!fileId) {
      return res.status(400).json({
        success: false,
        message: "fileId query parameter is required"
      });
    }

    const file = await getFileById(req.user.id, fileId);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found"
      });
    }

    const text = await extractText(file.file_path);
    const flashcards = generateFlashcards(text);

    res.json({
      success: true,
      fileName: file.file_name,
      flashcards
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFlashcards
};

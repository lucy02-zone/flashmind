const {
  getLatestFileForUser
} = require("../models/fileModel");
const {
  extractText
} = require("../services/textExtractionService");
const {
  generateQuiz
} = require("../services/quizService");

const getQuizzes = async (
  req,
  res,
  next
) => {
  try {
    const latestFile = await getLatestFileForUser(req.user.id);

    if (!latestFile) {
      return res.json({ success: true, quizzes: [] });
    }

    const text = await extractText(latestFile.file_path);
    const quizzes = generateQuiz(text);

    res.json({ success: true, quizzes });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuizzes
};

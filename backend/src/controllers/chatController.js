const {
  answerQuestion
} = require(
  "../services/chatService"
);

const {
  extractText
} = require(
  "../services/textExtractionService"
);

const {
  getFileById
} = require(
  "../services/summaryDataService"
);

const chatWithNotes =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        fileId,
        question
      } = req.body;

      if (!fileId || !question) {
        return res.status(400).json({
          success: false,
          message: "fileId and question are required"
        });
      }

      const file = await getFileById(
        req.user.id,
        fileId
      );

      if (!file) {
        return res.status(404).json({
          success: false,
          message: "File not found"
        });
      }

      const notes = await extractText(
        file.file_path
      );

      const answer = answerQuestion(
        notes,
        question
      );

      res.json({
        success: true,
        answer
      });

    } catch (error) {

      next(error);

    }

  };

module.exports = {
  chatWithNotes
};
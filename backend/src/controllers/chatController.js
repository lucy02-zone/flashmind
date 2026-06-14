const {
  answerQuestion
} = require(
  "../services/chatService"
);

const chatWithNotes =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        notes,
        question
      } = req.body;

      const answer =
        answerQuestion(
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
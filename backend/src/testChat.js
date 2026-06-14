const {
  extractText
} = require(
  "./services/textExtractionService"
);

const {
  answerQuestion
} = require(
  "./services/chatService"
);

(async () => {

  try {

    const notes =
      await extractText(
        "./src/uploads/sample.pdf"
      );

    const answer =
      answerQuestion(
        notes,
        "What is priority scheduling?"
      );

    console.log(answer);

  } catch (error) {

    console.error(error);

  }

})();
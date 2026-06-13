const {
  extractText
} = require(
  "./services/textExtractionService"
);

const {
  generateQuiz
} = require(
  "./services/quizService"
);

(async () => {

  try {

    const text =
      await extractText(
        "./src/uploads/sample.pdf"
      );

    const quizzes =
      generateQuiz(
        text
      );

    console.log(
      JSON.stringify(
        quizzes,
        null,
        2
      )
    );

  } catch (error) {

    console.error(
      error.message
    );

  }

})();
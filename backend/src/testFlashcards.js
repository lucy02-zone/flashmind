const {
  extractText
} = require(
  "./services/textExtractionService"
);

const {
  generateFlashcards
} = require(
  "./services/flashcardService"
);

(async () => {

  try {

    const text =
      await extractText(
        "./src/uploads/sample.pdf"
      );

    const flashcards =
      generateFlashcards(
        text
      );

    console.log(
      JSON.stringify(
        flashcards,
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
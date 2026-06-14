const {
  extractText
} = require(
  "./services/textExtractionService"
);

const {
  generateSummary
} = require(
  "./services/summaryService"
);

(async () => {

  try {

    const text =
      await extractText(
        "./src/uploads/sample.pdf"
      );

    const summary =
      await generateSummary(
        text
      );

    console.log(summary);

  } catch (error) {

    console.error(error);

  }

})();
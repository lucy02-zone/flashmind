const {
  extractText
} = require(
  "./services/textExtractionService"
);

(async () => {

  try {

    const text =
      await extractText(
        "./src/uploads/sample.pdf"
      );

    console.log(
      "Length:",
      text.length
    );

    console.log(
      text.substring(
        0,
        1000
      )
    );

  } catch (error) {

    console.error(
      error.message
    );

  }

})();
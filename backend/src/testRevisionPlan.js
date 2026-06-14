const {
  extractText
} = require(
  "./services/textExtractionService"
);

const {
  generateRevisionPlan
} = require(
  "./services/revisionPlannerService"
);

(async () => {

  try {

    const text =
      await extractText(
        "./src/uploads/sample.pdf"
      );

    const plan =
      generateRevisionPlan(
        text
      );

    console.log(
      JSON.stringify(
        plan,
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
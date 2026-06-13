const {
  extractDocxText
} = require(
  "./services/docxService"
);

(async () => {

  try {

    const text =
      await extractDocxText(
        "./src/uploads/sample.docx"
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

    console.error(error);

  }

})();
const {
  extractPdfText
} = require("./services/pdfService");

(async () => {

  const text =
    await extractPdfText(
      "./src/uploads/sample.pdf"
    );

  console.log("Length:", text.length);

  console.log(text);

})();
const generateSummary = async (
  text
) => {

  const cleanedText =
    text
      .replace(/\s+/g, " ")
      .trim();

  const sentences =
    cleanedText
      .split(/[.!?]/)
      .filter(
        sentence =>
          sentence.trim().length > 20
      );

  const summary =
    sentences
      .slice(0, 5)
      .join(". ");

  return `
Summary

${summary}

Key Points

${sentences
  .slice(0, 10)
  .map(
    (sentence, index) =>
      `${index + 1}. ${sentence.trim()}`
  )
  .join("\n")}
`;

};

module.exports = {
  generateSummary
};
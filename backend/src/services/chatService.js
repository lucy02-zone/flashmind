const answerQuestion = (
  noteText,
  question
) => {

  const sentences =
    noteText
      .split(/[.!?]/)
      .map(
        sentence =>
          sentence.trim()
      )
      .filter(Boolean);

  const questionWords =
    question
      .toLowerCase()
      .split(" ");

  const matched =
    sentences.filter(
      sentence => {

        const lower =
          sentence.toLowerCase();

        return questionWords.some(
          word =>
            lower.includes(word)
        );

      }
    );

  if (
    matched.length === 0
  ) {

    return (
      "No relevant information found in notes."
    );

  }

  return matched
    .slice(0, 5)
    .join(". ");

};

module.exports = {
  answerQuestion
};
const generateFlashcards = (
  text
) => {

  const flashcards = [];

  const sentences =
    text
      .split(/[.!?]/)
      .map(
        sentence =>
          sentence.trim()
      )
      .filter(
        sentence =>
          sentence.length > 20
      );

  for (
    let i = 0;
    i < sentences.length;
    i++
  ) {

    const sentence =
      sentences[i];

    const words =
      sentence.split(" ");

    if (
      words.length < 6
    ) {
      continue;
    }

    const answer =
      words
        .slice(0, 5)
        .join(" ");

    const question =
      `Explain: ${answer}?`;

    flashcards.push({
      question,
      answer: sentence
    });

    if (
      flashcards.length >= 20
    ) {
      break;
    }

  }

  return flashcards;
};

module.exports = {
  generateFlashcards
};
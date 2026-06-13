const generateQuiz = (
  text
) => {

  const quizzes = [];

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
        .slice(0, 3)
        .join(" ");

    quizzes.push({
      question:
        `What is related to "${answer}"?`,

      options: [
        answer,
        "Option B",
        "Option C",
        "Option D"
      ],

      answer
    });

    if (
      quizzes.length >= 20
    ) {
      break;
    }

  }

  return quizzes;
};

module.exports = {
  generateQuiz
};
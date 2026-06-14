const generateRevisionPlan = (
  text
) => {

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

  const plan = [];

  const topics =
    sentences.slice(
      0,
      10
    );

  topics.forEach(
    (
      topic,
      index
    ) => {

      plan.push({
        day:
          index + 1,

        topic:
          topic.substring(
            0,
            120
          )
      });

    }
  );

  plan.push({
    day:
      topics.length + 1,

    topic:
      "Full Revision"
  });

  plan.push({
    day:
      topics.length + 2,

    topic:
      "Self Assessment Quiz"
  });

  return plan;

};

module.exports = {
  generateRevisionPlan
};
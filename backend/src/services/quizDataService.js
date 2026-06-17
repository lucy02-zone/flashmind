const pool = require("../config/database");

const fetchQuizzes = async (userId) => {
  const [rows] = await pool.execute(
    `
      SELECT
        q.id AS quiz_id,
        qq.id AS question_id,
        qq.question,
        qq.option_a,
        qq.option_b,
        qq.option_c,
        qq.option_d,
        qq.correct_answer
      FROM quizzes q
      JOIN quiz_questions qq ON qq.quiz_id = q.id
      WHERE q.user_id = ?
      ORDER BY q.id, qq.id
    `,
    [userId]
  );

  const grouped = rows.reduce((acc, row) => {
    if (!acc[row.quiz_id]) {
      acc[row.quiz_id] = {
        id: row.quiz_id,
        questions: []
      };
    }

    acc[row.quiz_id].questions.push({
      id: row.question_id,
      question: row.question,
      option_a: row.option_a,
      option_b: row.option_b,
      option_c: row.option_c,
      option_d: row.option_d,
      correct_answer: row.correct_answer
    });

    return acc;
  }, {});

  return Object.values(grouped);
};

module.exports = {
  fetchQuizzes
};

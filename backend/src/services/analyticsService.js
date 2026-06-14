const pool =
  require("../config/database");

const getAnalytics =
  async (userId) => {

    const [[files]] =
      await pool.execute(
        `
        SELECT COUNT(*) AS total
        FROM files
        WHERE user_id = ?
        `,
        [userId]
      );

    const [[flashcards]] =
      await pool.execute(
        `
        SELECT COUNT(*) AS total
        FROM flashcards
        WHERE user_id = ?
        `,
        [userId]
      );

    const [[quizzes]] =
      await pool.execute(
        `
        SELECT COUNT(*) AS total
        FROM quizzes
        WHERE user_id = ?
        `,
        [userId]
      );

    const [[summaries]] =
      await pool.execute(
        `
        SELECT COUNT(*) AS total
        FROM summaries
        WHERE user_id = ?
        `,
        [userId]
      );

    const [[plans]] =
      await pool.execute(
        `
        SELECT COUNT(*) AS total
        FROM revision_plans
        WHERE user_id = ?
        `,
        [userId]
      );

    return {
      files: files.total,
      flashcards: flashcards.total,
      quizzes: quizzes.total,
      summaries: summaries.total,
      revisionPlans: plans.total
    };

  };

module.exports = {
  getAnalytics
};
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getQuizzes } from "../services/quizService";
import "../styles/quizzes.css";

const QuizzesPage = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadQuizzes();

  }, []);

  const loadQuizzes =
    async () => {

      try {

        const data =
          await getQuizzes();

        console.log(
          "QUIZ API RESPONSE:",
          data
        );

        setQuizzes(
          data.quizzes || []
        );

      } catch (error) {

        console.error(
          "QUIZ ERROR:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  if (loading) {
    return (
      <div className="quizzes-page">
        <h2>Loading quizzes...</h2>
      </div>
    );
  }

  return (
    <div className="quizzes-page">
      <div className="quizzes-header">
        <div>
          <h1>Quizzes</h1>
          <p>Explore your generated quiz questions and review answers to help reinforce your learning.</p>
        </div>
        <span className="quizzes-count">{quizzes.length} quizzes</span>
      </div>

      <div className="page-toolbar">
        <button className="back-home-btn" onClick={() => navigate("/")}>Back to home</button>
      </div>
      {quizzes.length === 0 ? (
        <div className="empty-state">
          <strong>No quizzes found</strong>
          Upload or generate notes to create quizzes automatically.
        </div>
      ) : (
        <div className="quizzes-grid">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">
              <h2 className="quiz-question">{quiz.question}</h2>
              <p className="quiz-answer">
                <strong>Answer:</strong> {quiz.correct_answer}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="debug-output">
        <h3>Debug Data</h3>
        <pre>{JSON.stringify(quizzes, null, 2)}</pre>
      </div>
    </div>
  );
};

export default QuizzesPage;
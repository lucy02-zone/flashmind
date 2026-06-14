import {
  useEffect,
  useState
} from "react";

import {
  getQuizzes
} from "../services/quizService";

const QuizzesPage = () => {

  const [
    quizzes,
    setQuizzes
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

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
      <h2>
        Loading quizzes...
      </h2>
    );
  }

  return (
    <div>

      <h1>
        Quizzes
      </h1>

      <p>
        Total Quizzes:
        {" "}
        {quizzes.length}
      </p>

      {
        quizzes.length === 0 ? (
          <p>
            No quizzes found.
          </p>
        ) : (
          quizzes.map(
            (quiz) => (
              <div
                key={quiz.id}
                style={{
                  border:
                    "1px solid #ccc",
                  padding:
                    "15px",
                  marginBottom:
                    "15px",
                  borderRadius:
                    "8px"
                }}
              >
                <h3>
                  {
                    quiz.question
                  }
                </h3>

                <p>
                  <strong>
                    Answer:
                  </strong>
                  {" "}
                  {
                    quiz.correct_answer
                  }
                </p>

              </div>
            )
          )
        )
      }

      <hr />

      <h3>
        Debug Data
      </h3>

      <pre>
        {
          JSON.stringify(
            quizzes,
            null,
            2
          )
        }
      </pre>

    </div>
  );
};

export default QuizzesPage;
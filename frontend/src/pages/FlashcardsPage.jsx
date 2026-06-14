import {
  useEffect,
  useState
} from "react";

import {
  getFlashcards
} from "../services/flashcardService";

const FlashcardsPage = () => {

  const [
    flashcards,
    setFlashcards
  ] = useState([]);

  useEffect(() => {

    loadFlashcards();

  }, []);

  const loadFlashcards =
    async () => {

      try {

        const data =
          await getFlashcards();

        setFlashcards(
          data.flashcards || []
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (
    <div>

      <h1>
        Flashcards
      </h1>

      {
        flashcards.map(
          (card) => (
            <div
              key={card.id}
              style={{
                border:
                  "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px"
              }}
            >
              <h3>
                {card.question}
              </h3>

              <p>
                {card.answer}
              </p>

            </div>
          )
        )
      }

    </div>
  );

};

export default FlashcardsPage;
import { useEffect, useState } from "react";

import { getFlashcards } from "../services/flashcardService";
import "../styles/flashcards.css";

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = async () => {
    try {
      const data = await getFlashcards();
      setFlashcards(data.flashcards || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flashcards-page">
      <div className="flashcards-header">
        <div>
          <h1>Flashcards</h1>
          <p>Review your uploaded notes with AI-generated flashcards for better recall and practice.</p>
        </div>
        <span className="flashcards-count">{flashcards.length} cards</span>
      </div>

      {flashcards.length === 0 ? (
        <div className="empty-state">
          <strong>No flashcards yet</strong>
          Upload a note to generate flashcards automatically.
        </div>
      ) : (
        <div className="flashcards-grid">
          {flashcards.map((card) => (
            <div key={card.id} className="flashcard-card">
              <h2 className="flashcard-question">{card.question}</h2>
              <p className="flashcard-answer">{card.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

};

export default FlashcardsPage;
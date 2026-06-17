import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getFlashcards } from "../services/flashcardService";
import { getUserFiles } from "../services/uploadService";
import "../styles/flashcards.css";

const FlashcardsPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [loadingFlashcards, setLoadingFlashcards] = useState(false);
  const [message, setMessage] = useState("");
  const [learnMode, setLearnMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoadingFiles(true);
    setMessage("");

    try {
      const data = await getUserFiles();
      setFiles(data.files || []);
      if (data.files?.length) {
        setSelectedFile(data.files[0]);
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to load uploaded files.");
    } finally {
      setLoadingFiles(false);
    }
  };

  const loadFlashcards = async (fileId) => {
    if (!fileId) {
      setMessage("Please select a file first.");
      return;
    }

    setLoadingFlashcards(true);
    setFlashcards([]);
    setMessage("");

    try {
      const data = await getFlashcards(fileId);
      setFlashcards(data.flashcards || []);
      if (!data.flashcards?.length) {
        setMessage("No flashcards could be generated from the selected file.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to generate flashcards. Try another file.");
    } finally {
      setLoadingFlashcards(false);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setFlashcards([]);
    setMessage("");
  };

  const startLearnMode = () => {
    setLearnMode(true);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const exitLearnMode = () => {
    setLearnMode(false);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe(e);
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextCard();
    } else if (isRightSwipe) {
      prevCard();
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

      <div className="page-toolbar">
        <button className="back-home-btn" onClick={() => navigate("/")}>Back to home</button>
      </div>

      {learnMode ? (
        <div className="learn-mode-container">
          <button className="exit-learn-btn" onClick={exitLearnMode}>✕ Exit Learn Mode</button>

          {flashcards.length > 0 && (
            <div className="learn-card-container">
              <div
                className={`learn-card ${isFlipped ? "flipped" : ""}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className="card-front">
                  <p className="card-label">Question</p>
                  <h2>{flashcards[currentCardIndex].question}</h2>
                </div>
                <div className="card-back">
                  <p className="card-label">Answer</p>
                  <p>{flashcards[currentCardIndex].answer}</p>
                </div>
              </div>

              <div className="card-navigation">
                <button
                  className="nav-btn"
                  onClick={prevCard}
                  disabled={currentCardIndex === 0}
                >
                  ← Previous
                </button>
                <span className="card-counter">
                  {currentCardIndex + 1} / {flashcards.length}
                </span>
                <button
                  className="nav-btn"
                  onClick={nextCard}
                  disabled={currentCardIndex === flashcards.length - 1}
                >
                  Next →
                </button>
              </div>

              <p className="swipe-hint">💡 Tap card to flip or swipe to navigate</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flashcards-toolbar">
            <div className="file-selection-panel">
              <h3>Select a file to learn from</h3>

              {loadingFiles ? (
                <p>Loading your uploaded files...</p>
              ) : files.length === 0 ? (
                <div className="empty-state">
                  <strong>No uploaded files found</strong>
                  Upload a note first, then come back to generate flashcards.
                </div>
              ) : (
                <div className="file-list">
                  {files.map((file) => (
                    <button
                      key={file.id}
                      type="button"
                      className={`file-chip ${selectedFile?.id === file.id ? "active" : ""}`}
                      onClick={() => handleFileSelect(file)}
                    >
                      {file.file_name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="generate-panel">
              <button
                className="generate-btn"
                onClick={() => loadFlashcards(selectedFile?.id)}
                disabled={loadingFiles || loadingFlashcards || !selectedFile}
              >
                {loadingFlashcards ? "Generating..." : "Generate Flashcards"}
              </button>
              {selectedFile && <p className="selected-file-label">Selected: {selectedFile.file_name}</p>}
            </div>
          </div>

          {message && <div className="flashcards-message">{message}</div>}

          {flashcards.length === 0 ? (
            <div className="empty-state">
              <strong>{selectedFile ? "No flashcards yet" : "Select a file to start."}</strong>
              <p>
                {selectedFile
                  ? "Click Generate Flashcards to create study cards from your selected note."
                  : "Choose a file from the list above to begin."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid-mode-header">
                <h3>Your Flashcards</h3>
                <button className="learn-btn" onClick={startLearnMode}>
                  🎓 Start Learning
                </button>
              </div>
              <div className="flashcards-grid">
                {flashcards.map((card, index) => (
                  <div key={index} className="flashcard-card">
                    <h2 className="flashcard-question">{card.question}</h2>
                    <p className="flashcard-answer">{card.answer}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );

};

export default FlashcardsPage;
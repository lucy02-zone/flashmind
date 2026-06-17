import { useEffect, useState } from "react";

import { getFlashcards } from "../services/flashcardService";
import { getUserFiles } from "../services/uploadService";
import "../styles/flashcards.css";

const FlashcardsPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [loadingFlashcards, setLoadingFlashcards] = useState(false);
  const [message, setMessage] = useState("");

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

  return (
    <div className="flashcards-page">
      <div className="flashcards-header">
        <div>
          <h1>Flashcards</h1>
          <p>Review your uploaded notes with AI-generated flashcards for better recall and practice.</p>
        </div>
        <span className="flashcards-count">{flashcards.length} cards</span>
      </div>

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
        <div className="flashcards-grid">
          {flashcards.map((card, index) => (
            <div key={index} className="flashcard-card">
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
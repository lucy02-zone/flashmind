import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { FaUpload, FaFilePdf } from "react-icons/fa";
import { uploadFile } from "../services/uploadService";
import "../styles/uploads.css";

const UploadsPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files?.[0] ?? null);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❗ Please select a file first.");
      return;
    }

    setLoading(true);

    try {
      await uploadFile(file);
      setMessage("✅ Uploaded successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const preventDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event) => {
    preventDrag(event);
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    preventDrag(event);
    setDragActive(false);
  };

  const handleDrop = (event) => {
    preventDrag(event);
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
      setMessage("");
    }
  };

  return (
    <DashboardLayout>
      <div className="upload-container">
        <div className="upload-header">
          <div>
            <h1>Upload Notes</h1>
            <p>Upload your notes and automatically generate flashcards, quizzes, and summaries.</p>
          </div>
          <span className="upload-badge">Supported: PDF, DOCX, TXT</span>
        </div>

        <div className="upload-card">
          <div className="upload-top">
            <div className="upload-icon">
              <FaUpload />
            </div>
            <div className="upload-copy">
              <h2>Study smarter with one upload</h2>
              <p>Drop your note file below or select it manually to begin.</p>
            </div>
          </div>

          <div
            className={`drop-zone ${dragActive ? "active" : ""}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="drop-zone-content">
              <p className="drop-title">Drag and drop your file here</p>
              <p className="drop-subtitle">or click the button to choose a file from your device.</p>
            </div>

            <label className="file-input">
              <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} />
              Select a file
            </label>
          </div>

          {file ? (
            <div className="selected-file">
              <FaFilePdf />
              <div>
                <strong>{file.name}</strong>
                <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          ) : (
            <p className="hint">No file selected yet.</p>
          )}

          <button className="upload-btn" onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload Notes"}
          </button>

          {message && (
            <p className={`message ${message.startsWith("✅") ? "success" : message.startsWith("❌") ? "error" : "warning"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadsPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSummaries } from "../services/summaryService";
import { getUserFiles } from "../services/uploadService";
import "../styles/summaries.css";

const SummariesPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [loadingSummaries, setLoadingSummaries] = useState(false);
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
        await loadSummaryForFile(data.files[0].id);
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to load uploaded files.");
    } finally {
      setLoadingFiles(false);
    }
  };

  const loadSummaryForFile = async (fileId) => {
    if (!fileId) {
      setMessage("Please select a file first.");
      return;
    }

    setLoadingSummaries(true);
    setSummaries([]);
    setMessage("");

    try {
      const data = await getSummaries();
      const fileSummaries = data.summaries || [];
      const selectedSummary = fileSummaries.find((s) => s.id === fileId);

      if (selectedSummary) {
        setSummaries([selectedSummary]);
      } else {
        setMessage("No summary available for this file.");
        setSummaries([]);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to load summary. Try another file.");
    } finally {
      setLoadingSummaries(false);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    loadSummaryForFile(file.id);
  };

  return (
    <div className="summaries-page">
      <div className="summaries-header">
        <div>
          <h1>Summaries</h1>
          <p>View automatic summaries for every uploaded PDF with a separate entry for each file.</p>
        </div>
        <span className="summary-count">{summaries.length} summary</span>
      </div>

      <div className="page-toolbar">
        <button className="back-home-btn" onClick={() => navigate("/")}>Back to home</button>
      </div>

      <div className="summaries-toolbar">
        <div className="file-selection-panel">
          <h3>Select a file to view summary</h3>

          {loadingFiles ? (
            <p>Loading your uploaded files...</p>
          ) : files.length === 0 ? (
            <div className="empty-state">
              <strong>No uploaded files found</strong>
              Upload a file first, then come back to view summaries.
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
      </div>

      {message && <div className="summaries-message">{message}</div>}

      {loadingSummaries ? (
        <p className="loading-text">Loading summary...</p>
      ) : summaries.length === 0 ? (
        <div className="empty-state">
          <strong>{selectedFile ? "No summary available" : "Select a file to start"}</strong>
          <p>
            {selectedFile
              ? "This file doesn't have a generated summary yet."
              : "Choose a file from the list above to view its summary."}
          </p>
        </div>
      ) : (
        summaries.map((summary) => (
          <div key={summary.id} className="summary-card">
            <h2>{summary.fileName}</h2>
            <p>{summary.summary}</p>
          </div>
        ))
      )}
    </div>
  );

};

export default SummariesPage;
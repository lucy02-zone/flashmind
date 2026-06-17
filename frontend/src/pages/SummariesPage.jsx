import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSummaries } from "../services/summaryService";
import "../styles/summaries.css";

const SummariesPage = () => {
  const navigate = useNavigate();
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadSummaries();

  }, []);

  const loadSummaries = async () => {
    try {
      const data = await getSummaries();
      setSummaries(data.summaries || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summaries-page">
      <div className="summaries-header">
        <div>
          <h1>Summaries</h1>
          <p>View automatic summaries for every uploaded PDF with a separate entry for each file.</p>
        </div>
        <span className="summary-count">{summaries.length} summaries</span>
      </div>

      <div className="page-toolbar">
        <button className="back-home-btn" onClick={() => navigate("/")}>Back to home</button>
      </div>
      {loading ? (
        <p>Loading summaries...</p>
      ) : summaries.length === 0 ? (
        <div className="empty-state">
          <strong>No summaries found</strong>
          Upload a PDF and come back to see generated summaries per file.
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
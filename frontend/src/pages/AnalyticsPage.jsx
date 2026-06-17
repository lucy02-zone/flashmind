import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import "../styles/analytics.css";

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/analytics");
      setAnalytics(response.data.analytics);
    } catch (err) {
      console.error(err);
      setError("Failed to load analytics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!analytics) return 0;
    return (
      (analytics.files || 0) +
      (analytics.flashcards || 0) +
      (analytics.quizzes || 0) +
      (analytics.summaries || 0) +
      (analytics.revisionPlans || 0)
    );
  };

  const calculateProductivity = () => {
    if (!analytics || !analytics.files) return 0;
    const generated =
      (analytics.flashcards || 0) +
      (analytics.quizzes || 0) +
      (analytics.summaries || 0) +
      (analytics.revisionPlans || 0);
    return Math.round((generated / (analytics.files * 4)) * 100);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="analytics-page">
          <div className="analytics-header">
            <div>
              <h1>Analytics</h1>
              <p>Loading your learning statistics...</p>
            </div>
          </div>
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Fetching analytics data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="analytics-page">
          <div className="analytics-header">
            <div>
              <h1>Analytics</h1>
            </div>
          </div>
          <div className="error-message">{error}</div>
          <div className="page-toolbar">
            <button className="back-home-btn" onClick={() => navigate("/")}>
              Back to home
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="analytics-page">
          <div className="analytics-header">
            <div>
              <h1>Analytics</h1>
              <p>No analytics data available.</p>
            </div>
          </div>
          <div className="page-toolbar">
            <button className="back-home-btn" onClick={() => navigate("/")}>
              Back to home
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1>Analytics Dashboard</h1>
          <p>Track your learning progress and study activity</p>
        </div>
        <span className="total-count">{calculateTotal()} total</span>
      </div>

      <div className="page-toolbar">
        <button className="back-home-btn" onClick={() => navigate("/")}>
          Back to home
        </button>
        <button className="refresh-btn" onClick={loadAnalytics}>
          Refresh
        </button>
      </div>

      <div className="analytics-summary">
        <div className="summary-card">
          <div className="summary-icon productivity">📊</div>
          <div className="summary-content">
            <h3>Productivity</h3>
            <p className="summary-value">{calculateProductivity()}%</p>
            <span className="summary-label">Study intensity</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon total">📚</div>
          <div className="summary-content">
            <h3>Total Activity</h3>
            <p className="summary-value">{calculateTotal()}</p>
            <span className="summary-label">All items generated</span>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="metric-card files">
          <div className="metric-icon">📁</div>
          <div className="metric-content">
            <h2>Uploaded Files</h2>
            <p className="metric-value">{analytics.files || 0}</p>
            <span className="metric-label">PDFs, DOCs, and other files</span>
          </div>
        </div>

        <div className="metric-card flashcards">
          <div className="metric-icon">🎴</div>
          <div className="metric-content">
            <h2>Flashcards</h2>
            <p className="metric-value">{analytics.flashcards || 0}</p>
            <span className="metric-label">Generated from your files</span>
          </div>
        </div>

        <div className="metric-card quizzes">
          <div className="metric-icon">❓</div>
          <div className="metric-content">
            <h2>Quizzes</h2>
            <p className="metric-value">{analytics.quizzes || 0}</p>
            <span className="metric-label">Self-assessment tests</span>
          </div>
        </div>

        <div className="metric-card summaries">
          <div className="metric-icon">📝</div>
          <div className="metric-content">
            <h2>Summaries</h2>
            <p className="metric-value">{analytics.summaries || 0}</p>
            <span className="metric-label">Quick content overviews</span>
          </div>
        </div>

        <div className="metric-card revision">
          <div className="metric-icon">🔄</div>
          <div className="metric-content">
            <h2>Revision Plans</h2>
            <p className="metric-value">{analytics.revisionPlans || 0}</p>
            <span className="metric-label">Personalized study schedules</span>
          </div>
        </div>
      </div>

      <div className="analytics-insights">
        <h2>Quick Insights</h2>
        <div className="insights-grid">
          {analytics.files > 0 && (
            <div className="insight-card">
              <div className="insight-icon">✨</div>
              <h3>Great Start!</h3>
              <p>You've uploaded {analytics.files} file{analytics.files > 1 ? "s" : ""}. Start learning by generating flashcards!</p>
            </div>
          )}

          {analytics.flashcards > analytics.quizzes && analytics.flashcards > 0 && (
            <div className="insight-card">
              <div className="insight-icon">🎯</div>
              <h3>Strong Flashcard Usage</h3>
              <p>You've created {analytics.flashcards} flashcards. Consider testing yourself with a quiz!</p>
            </div>
          )}

          {analytics.revisionPlans > 0 && (
            <div className="insight-card">
              <div className="insight-icon">📈</div>
              <h3>Planned Learning</h3>
              <p>You have {analytics.revisionPlans} revision plan{analytics.revisionPlans > 1 ? "s" : ""}. Stay consistent to master the material!</p>
            </div>
          )}

          {calculateProductivity() >= 80 && (
            <div className="insight-card">
              <div className="insight-icon">🚀</div>
              <h3>Excellent Productivity</h3>
              <p>Your study intensity is at {calculateProductivity()}%! You're making the most of your learning materials.</p>
            </div>
          )}

          {analytics.files === 0 && (
            <div className="insight-card">
              <div className="insight-icon">🎓</div>
              <h3>Get Started</h3>
              <p>Upload your first file to begin generating flashcards, summaries, and more!</p>
            </div>
          )}

          {calculateTotal() === 0 && analytics.files > 0 && (
            <div className="insight-card">
              <div className="insight-icon">💡</div>
              <h3>Ready to Learn</h3>
              <p>Your files are ready. Create flashcards, summaries, or quizzes to start studying!</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
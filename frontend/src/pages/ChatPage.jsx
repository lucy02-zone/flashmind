import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

import { sendMessage } from "../services/chatService";
import { getUserFiles } from "../services/uploadService";
import "../styles/chat.css";

const ChatPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoadingFiles(true);
    setError("");

    try {
      const data = await getUserFiles();
      setFiles(data.files || []);
      if (data.files?.length) {
        setSelectedFile(data.files[0]);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load uploaded files.");
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setMessages([]);
    setError("");
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    const userMessage = inputValue;
    setInputValue("");
    setMessages((prev) => [
      ...prev,
      { type: "user", content: userMessage }
    ]);
    setLoadingMessage(true);
    setError("");

    try {
      const response = await sendMessage(selectedFile.id, userMessage);
      setMessages((prev) => [
        ...prev,
        { type: "assistant", content: response.answer || "No response" }
      ]);
    } catch (err) {
      console.error(err);
      setError("Failed to get response. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoadingMessage(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <DashboardLayout>
      <div className="chat-page">
        <div className="chat-header">
          <div>
            <h1>AI Chat Assistant</h1>
            <p>Ask questions about your uploaded documents</p>
          </div>
          <span className="chat-badge">Interactive Learning</span>
        </div>

        <div className="page-toolbar">
          <button className="back-home-btn" onClick={() => navigate("/")}>
            Back to home
          </button>
        </div>

        <div className="chat-container">
          <div className="file-selection-sidebar">
            <div className="file-selection-panel">
              <h3>Select Document</h3>

              {loadingFiles ? (
                <p className="loading-text">Loading your files...</p>
              ) : files.length === 0 ? (
                <div className="empty-state">
                  <strong>No documents found</strong>
                  <p>Upload a file first to start chatting.</p>
                </div>
              ) : (
                <div className="file-list">
                  {files.map((file) => (
                    <button
                      key={file.id}
                      type="button"
                      className={`file-chip ${
                        selectedFile?.id === file.id ? "active" : ""
                      }`}
                      onClick={() => handleFileSelect(file)}
                    >
                      {file.file_name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="chat-main">
            {error && <div className="error-banner">{error}</div>}

            {!selectedFile ? (
              <div className="chat-empty">
                <div className="empty-icon">📄</div>
                <h2>Select a Document</h2>
                <p>Choose a file from the left to start chatting about it.</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="chat-welcome">
                <div className="welcome-icon">💬</div>
                <h2>Start Your Conversation</h2>
                <p>Ask questions about <strong>{selectedFile?.file_name}</strong></p>
                <div className="suggestion-chips">
                  <button
                    className="suggestion-chip"
                    onClick={() => {
                      setInputValue("Summarize the main topics");
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                  >
                    Summarize topics
                  </button>
                  <button
                    className="suggestion-chip"
                    onClick={() => {
                      setInputValue("What are the key points?");
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                  >
                    Key points
                  </button>
                  <button
                    className="suggestion-chip"
                    onClick={() => {
                      setInputValue("Explain the main concepts");
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                  >
                    Main concepts
                  </button>
                </div>
              </div>
            ) : (
              <div className="messages-container">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message message-${msg.type}`}
                  >
                    <div className="message-avatar">
                      {msg.type === "user" ? "👤" : "🤖"}
                    </div>
                    <div className="message-content">
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ))}
                {loadingMessage && (
                  <div className="message message-loading">
                    <div className="message-avatar">🤖</div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedFile && (
              <div className="chat-input-area">
                <div className="input-wrapper">
                  <textarea
                    className="chat-input"
                    placeholder="Ask a question about the document..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loadingMessage}
                    rows={3}
                  />
                  <button
                    className="send-btn"
                    onClick={handleSendMessage}
                    disabled={loadingMessage || !inputValue.trim()}
                  >
                    {loadingMessage ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;

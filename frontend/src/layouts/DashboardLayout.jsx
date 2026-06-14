// src/layouts/DashboardLayout.jsx

import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const DashboardLayout = ({
  children
}) => {
  const navigate = useNavigate();

const { logout } = useAuth();

const handleLogout = () => {
  logout();
  navigate("/login");
};

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh"
      }}
    >
      <aside
        style={{
          width: "250px",
          background: "#f5f5f5",
          padding: "20px"
        }}
      >
        <h2>FlashMind AI</h2>

        <nav>

          <p>
            <Link to="/">
              Dashboard
            </Link>
          </p>

          <p>
            <Link to="/uploads">
              Uploads
            </Link>
          </p>

          <p>
            <Link to="/flashcards">
              Flashcards
            </Link>
          </p>

          <p>
            <Link to="/quizzes">
              Quizzes
            </Link>
          </p>

          <p>
            <Link to="/summaries">
              Summaries
            </Link>
          </p>

          <p>
            <Link to="/revision-plans">
              Revision Plans
            </Link>
          </p>

          <p>
            <Link to="/analytics">
              Analytics
            </Link>
          </p>

          <p>
            <Link to="/chat">
              AI Chat
            </Link>
          </p>

          <button
  onClick={handleLogout}
>
  Logout
</button>co

        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "20px"
        }}
      >
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;
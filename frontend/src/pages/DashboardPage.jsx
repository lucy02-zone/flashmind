import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

import {
  FaFileAlt,
  FaLayerGroup,
  FaQuestionCircle,
  FaBook
} from "react-icons/fa";

import "../styles/dashboard.css";

const DashboardPage = () => {

  const navigate = useNavigate();

  const cards = [
    {
      title: "Files",
      description:
        "Manage uploaded notes and study materials.",
      icon: <FaFileAlt />
    },
    {
      title: "Flashcards",
      description:
        "Practice using AI generated flashcards.",
      icon: <FaLayerGroup />
    },
    {
      title: "Quizzes",
      description:
        "Test your knowledge with quizzes.",
      icon: <FaQuestionCircle />
    },
    {
      title: "Summaries",
      description:
        "Quickly revise using concise summaries.",
      icon: <FaBook />
    }
  ];

  return (

    <DashboardLayout>

      <div className="dashboard-container">

        <section className="hero">

          <h1>
            Learn • Revise • Master
          </h1>

          <p>
            Interactive AI learning platform
            for notes, flashcards, quizzes,
            summaries and revision plans.
          </p>

          <button
            className="hero-btn"
            onClick={() =>
              navigate("/flashcards")
            }
          >
            Start Learning
          </button>

        </section>

        <div className="quick-actions">

          <button
            onClick={() =>
              navigate("/uploads")
            }
          >
            Upload Notes
          </button>

          <button
            onClick={() =>
              navigate("/quizzes")
            }
          >
            Generate Quiz
          </button>

          <button
            onClick={() =>
              navigate("/flashcards")
            }
          >
            Flashcards
          </button>

        </div>

        <section className="feature-grid">

          {
            cards.map(
              (card, index) => (

                <div
                  key={index}
                  className="feature-card"
                >

                  <div className="feature-icon">
                    {card.icon}
                  </div>

                  <h3>
                    {card.title}
                  </h3>

                  <p>
                    {card.description}
                  </p>

                </div>

              )
            )
          }

        </section>

      </div>

    </DashboardLayout>

  );

};

export default DashboardPage;
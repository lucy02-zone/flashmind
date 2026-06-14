import {
  FaHome,
  FaUpload,
  FaLayerGroup,
  FaQuestionCircle,
  FaFileAlt,
  FaChartBar,
  FaComments
} from "react-icons/fa";

import {
  Link
} from "react-router-dom";

import "../../styles/sidebar.css";

const Sidebar = () => {

  return (
    <div className="sidebar">

      <div className="logo">
        FlashMind AI
      </div>

      <nav>

        <Link to="/">
          <FaHome />
          Dashboard
        </Link>

        <Link to="/uploads">
          <FaUpload />
          Uploads
        </Link>

        <Link to="/flashcards">
          <FaLayerGroup />
          Flashcards
        </Link>

        <Link to="/quizzes">
          <FaQuestionCircle />
          Quizzes
        </Link>

        <Link to="/summaries">
          <FaFileAlt />
          Summaries
        </Link>

        <Link to="/analytics">
          <FaChartBar />
          Analytics
        </Link>

        <Link to="/chat">
          <FaComments />
          Chat
        </Link>

      </nav>

    </div>
  );

};

export default Sidebar;
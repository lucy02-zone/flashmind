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
  NavLink
} from "react-router-dom";

import "../../styles/sidebar.css";

const Sidebar = () => {

  return (
    <div className="sidebar">

      <div className="logo">
        FlashMind AI
      </div>

      <nav>

        <NavLink to="/" end>
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/uploads">
          <FaUpload />
          Uploads
        </NavLink>

        <NavLink to="/flashcards">
          <FaLayerGroup />
          Flashcards
        </NavLink>

        <NavLink to="/quizzes">
          <FaQuestionCircle />
          Quizzes
        </NavLink>

        <NavLink to="/summaries">
          <FaFileAlt />
          Summaries
        </NavLink>

        <NavLink to="/analytics">
          <FaChartBar />
          Analytics
        </NavLink>

        <NavLink to="/chat">
          <FaComments />
          Chat
        </NavLink>

      </nav>

    </div>
  );

};

export default Sidebar;
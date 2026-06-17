import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";

import "../../styles/navbar.css";

import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <div className="search-box">
        <FaSearch />
        <input placeholder="Search notes..." />
      </div>

      <div className="navbar-right">
        <FaBell />
        <div className="profile-info">
          <span>{user?.name || "Guest"}</span>
          <FaUserCircle />
        </div>
        <button
          className="logout-btn"
          onClick={logout}
          type="button"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
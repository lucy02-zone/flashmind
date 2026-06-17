import {
  FaBell,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";

import "../../styles/navbar.css";

import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

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
      </div>
    </div>
  );
};

export default Navbar;
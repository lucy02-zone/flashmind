import {
  FaBell,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";

import "../../styles/navbar.css";

const Navbar = () => {

  return (

    <div className="navbar">

      <div className="search-box">

        <FaSearch />

        <input
          placeholder="Search notes..."
        />

      </div>

      <div className="navbar-right">

        <FaBell />

        <FaUserCircle />

      </div>

    </div>

  );

};

export default Navbar;
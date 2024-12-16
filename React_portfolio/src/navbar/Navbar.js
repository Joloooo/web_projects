import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import ThemeToggle from "./ThemeToggle";

function Navbar({ onThemeChange, navbarData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const navigate = useNavigate();

  // Check login state
  const isLoggedIn = !!localStorage.getItem("token");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    localStorage.removeItem("token");    
    navigate("/login");
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Select links based on login state
  const currentLinks = isLoggedIn ? navbarData.loggedIn : navbarData.loggedOut;

  return (
    <div>
      <nav id="navbar">
        <div id="left-section">
          {currentLinks.map((link, index) =>
            link.id === "Logout" ? (
              <Link
                key={index}
                to={link.path}
                id={link.id}
                className="logout-btn"
                onClick={handleLogout} // Attach the logout handler here
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={index}
                to={link.path}
                id={link.id}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div id="navbar-center-section">
          <span id="site-name">{navbarData.siteName}</span>
          <ThemeToggle onThemeChange={onThemeChange} />
        </div>

        <button
          id="navbar-menu-button"
          ref={menuButtonRef}
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        <div
          ref={menuRef}
          id="navbar-menu-items"
          className={menuOpen ? "active" : ""}
        >
          {currentLinks.map((link, index) =>
            link.id === "Logout" ? (
              <Link
                key={index}
                to={link.path}
                id={link.id}
                className="logout-btn"
                onClick={handleLogout} // Attach the logout handler here
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={index}
                to={link.path}
                id={link.id}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

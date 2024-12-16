import React, { useState, useEffect } from 'react';
import './Navbar.css';

function ThemeToggle({ onThemeChange }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    onThemeChange(newTheme);
    document.body.className = newTheme;
  };

  // One-time effect to set theme based on the time on initial load
  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    console.log("Current hour:", hours);

    // Only set theme based on time if it's not manually set in local storage
    if (!localStorage.getItem('theme')) {
      const initialTheme = hours >= 6 && hours < 18 ? 'light' : 'dark';
      toggleTheme(initialTheme);
      window.location.reload(); // Refresh the page to apply theme on initial load
    } else {
      // If there's a saved theme, apply it directly
      document.body.className = theme;
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <button onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')} id="theme-toggle">
      {theme === 'light' ? '🌜' : '🌞'}
    </button>
  );
}

export default ThemeToggle;

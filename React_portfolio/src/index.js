import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './navbar/Navbar.css'; // Import theme styles globally
import App from './App';
import reportWebVitals from './reportWebVitals';

// Immediately set theme class on the body based on localStorage before React renders
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(savedTheme);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

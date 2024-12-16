import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import ParticlesComponent from './component/particles';
import Resume from './component/Resume';
import Projects from './component/Projects';
import Home from './component/home';
import RegisterFunction from './component/Authentication/Register';
import LoginFunction from './component/Authentication/Login';
import MyProfile from './component/MyProfile';
import './App.css';
import { registerFunctionData, loginFunctionData, navbarData, projectData, resumeData, homeData } from './data';
import PasswordRecovery from './component/Authentication/ForgotPassword '
function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Pass navbarData as a prop to Navbar */}
        <Navbar onThemeChange={handleThemeChange} navbarData={navbarData} />
        <ParticlesComponent id="particles" theme={theme} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home home={homeData} />} />
            <Route path="/myprofile" element={<MyProfile/>} />
            <Route path="/about" element={<Resume resume={resumeData} />} />
            <Route path="/projects" element={<Projects projects={projectData} />} />
            <Route path="/login" element={<LoginFunction loginPropInput={loginFunctionData}/>} />
            <Route path="/register" element={<RegisterFunction registerPropInput={registerFunctionData}/>} />
            <Route path="/password-recovery" element={<PasswordRecovery/>} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

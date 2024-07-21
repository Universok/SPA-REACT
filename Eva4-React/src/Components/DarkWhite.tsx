import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button 
      onClick={toggleTheme} 
      className={`btn ${isDarkMode ? 'btn-white': 'btn-dark'}`}
      style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
    >
      {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
    </button>
  );
};

export default ThemeToggle;
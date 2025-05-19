import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material'; 

interface ThemeSwitcherProps {
  toggleTheme: (isDark: boolean) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ toggleTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      toggleTheme(true); 
    }
  }, [toggleTheme]);

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    toggleTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <IconButton onClick={handleThemeToggle}>
      {isDarkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ThemeSwitcher;

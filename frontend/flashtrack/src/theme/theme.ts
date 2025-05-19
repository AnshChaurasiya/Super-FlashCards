// src/theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';

// Define the light and dark themes
const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Your primary color
    },
    background: {
      default: '#f5f5f5', // Light background
    },
    text: {
      primary: '#000000', // Dark text
    },
  },
};

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc', // Your primary color for dark mode
    },
    background: {
      default: '#121212', // Dark background
    },
    text: {
      primary: '#ffffff', // Light text
    },
  },
};

export { lightTheme, darkTheme };

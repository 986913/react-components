import { useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') {
        return 'dark';
      }
      return 'light';
    });
  };
  return { theme, toggleTheme };
};

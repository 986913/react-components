import React, { useState, useContext } from 'react';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

// define 2 customize hooks:
export const useTheme = () => useContext(ThemeContext);
export const useUpdateTheme = () => useContext(ThemeUpdateContext);

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDartTheme] = useState(true);
  const toggleTheme = () => setDartTheme((prevDarkTheme) => !prevDarkTheme);

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

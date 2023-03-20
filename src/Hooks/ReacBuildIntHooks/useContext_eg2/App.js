import React from 'react';
import { ThemeProvider, useTheme, useUpdateTheme } from './ThemeContext';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <FunctionContextComponent />
      </ThemeProvider>
    </>
  );
}

const FunctionContextComponent = () => {
  const darkTheme = useTheme(); // use customize hook here
  const toggleTheme = useUpdateTheme(); // use customize hook here
  const themeStyle = {
    backgroundColor: darkTheme ? 'black' : '#ccc',
    color: darkTheme ? '#ccc' : 'black',
    padding: '1em',
  };
  return (
    <>
      <button onClick={toggleTheme}>toggle Theme</button>
      <div style={themeStyle}>FunctionContextComponent</div>
    </>
  );
};

import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext(); // 1st setup context here
export default function App() {
  const [darkTheme, setDartTheme] = useState(true);
  const toggleTheme = () => setDartTheme((prevDarkTheme) => !prevDarkTheme);
  return (
    <>
      <ThemeContext.Provider value={darkTheme}>
        <button onClick={toggleTheme}>toggle Theme</button>
        <FunctionContextComponent />
        <ClassContextComponent />
      </ThemeContext.Provider>
    </>
  );
}

// inside function component, use "useContext"
const FunctionContextComponent = () => {
  const darkTheme = useContext(ThemeContext);
  const themeStyle = {
    backgroundColor: darkTheme ? 'black' : '#ccc',
    color: darkTheme ? '#ccc' : 'black',
    padding: '2em',
    margin: '2em',
  };
  return <div style={themeStyle}>FunctionContextComponent</div>;
};

// inside class component, we use "ThemeContext.Consumer" to wrap to access context value in this case
class ClassContextComponent extends React.Component {
  themeStyles(dark) {
    return {
      backgroundColor: dark ? 'black' : '#ccc',
      color: dark ? '#ccc' : 'black',
      padding: '2em',
      margin: '2em',
    };
  }
  render() {
    return (
      <ThemeContext.Consumer>
        {(darkTheme) => {
          return <div style={this.themeStyles(darkTheme)}> Class theme</div>;
        }}
      </ThemeContext.Consumer>
    );
  }
}

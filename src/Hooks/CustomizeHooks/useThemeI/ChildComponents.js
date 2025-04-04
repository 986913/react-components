import { useTheme } from './useTheme';

export const ThemedButton = () => {
  /*********************  hook usage 1 **************************/

  // Step 6: 在被包裹的子组件中使用自定义Hook - useTheme
  const [theme, toggleTheme] = useTheme();

  const buttonStyle = {
    backgroundColor: theme === 'dark' ? '#333' : '#FFF',
    color: theme === 'dark' ? '#FFF' : '#333',
  };

  return (
    <button style={buttonStyle} onClick={toggleTheme}>
      {theme === 'dark' ? '🌙' : '☀️'} Toggle Theme
    </button>
  );
};

export const ThemedDiv = () => {
  /*********************  hook usage 2 **************************/

  // Step 6: 在被包裹的子组件中使用自定义Hook - useTheme
  const [theme, toggleTheme] = useTheme();

  const divStyle = {
    backgroundColor: theme === 'dark' ? '#333' : '#FFF',
    height: '100px',
    width: '100px',
  };

  return (
    <div style={divStyle} onClick={toggleTheme}>
      {theme === 'dark' ? '🌙' : '☀️'}
    </div>
  );
};

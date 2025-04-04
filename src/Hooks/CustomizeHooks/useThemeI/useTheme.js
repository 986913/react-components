import { useState, createContext, useContext } from 'react';

// Step 1:  创建context对象, 不要导出！
const themeContext = createContext();
const themeSetterContext = createContext();

// Step 2: 创建Provider组件
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === 'light' ? 'dark' : 'light';
    });
  };

  return (
    <themeContext.Provider value={theme}>
      <themeSetterContext.Provider value={toggleTheme}>
        {children}
      </themeSetterContext.Provider>
    </themeContext.Provider>
  );
};

// Step 5: 自定义Hook - useTheme
/* 
  输入: None
  输出: 一个数组，第一项是当前theme, 第二项是改变theme的函数
*/
export const useTheme = () => {
  const theme = useContext(themeContext);
  const toggleTheme = useContext(themeSetterContext);

  if (!toggleTheme || !theme) throw new Error('The ThemeProvider is missing');

  return [theme, toggleTheme];
};

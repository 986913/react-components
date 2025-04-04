import { useState, useEffect } from 'react';

// helper function:
const getSize = () => {
  return {
    curWidth: window.innerWidth,
    curHeight: window.innerHeight,
  };
};

/* 
  输入: 无
  输出: 一个对象: {curWidth, curHeight}，表示当前浏览器的width和height
*/
export const useWindowSize = () => {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

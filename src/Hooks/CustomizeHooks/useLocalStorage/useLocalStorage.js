import { useEffect, useState } from 'react';

/* 
  输入: key and initVsalue for localStorage
  输出: localStorage user中最新的value, 和 更新localStorage value的函数
*/
export const useLocalStorage = (key, initValue) => {
  const [val, setVal] = useState(() => {
    // 同步读取localStorage中的值
    const storedVal = window.localStorage.getItem(key);
    return storedVal ? storedVal : initValue;
  });

  // 当val或key变化时保存到localStorage
  useEffect(() => {
    window.localStorage.setItem(key, val);
  }, [key, val]);

  return [val, setVal];
};

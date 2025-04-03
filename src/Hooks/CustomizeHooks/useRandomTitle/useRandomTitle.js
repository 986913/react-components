import { useState } from 'react';
import { useDocumentTitle } from './useDocumentTitle';

// helper function:
const getRandomIdx = (len) => Math.floor(Math.random() * len);

/* 
  输入：titles是数组
  输出：改变当前title的函数
*/
export const useRandomTitle = (titles = ['你好']) => {
  const [index, setIndex] = useState(() => getRandomIdx(titles.length)); // index初始值是getRandomIdx(titles.length)
  useDocumentTitle(titles[index]); // Hook内使用另一个自定义hook

  // 返回一个函数，用于更改index
  return () => setIndex(getRandomIdx(titles.length));
};

// This is a React Quiz from BFE.dev, What does the code snippet to the right output by console.log?

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [count, setCount] = useState(1);
  console.log(1);
  useEffect(() => {
    console.log(2);
    return () => {
      console.log(3);
    };
  }, [count]);

  useEffect(() => {
    console.log(4);
    setCount((count) => count + 1);
  }, []);
  return <Child count={count} />;
}

function Child({ count }) {
  useEffect(() => {
    console.log(5);
    return () => {
      console.log(6);
    };
  }, [count]);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/**
//first render
1
5
2
4
//re-render
1
6
3
5
2
 */

/*
通用知识点❗❗❗❗❗❗❗❗❗❗❗

  挂载时 (优先级由高到低)：
    render主线程 --> useInsertionEffect --> useLayoutEffect --> useEffect

  re-render时 (优先级由高到低):
    render主线程 --> useInsertionEffect cleanup  ---> useLayoutEffect clean up   --->  useEffect ALL cleanup by order --> useEffect executed by order
                    then immediately executed        then immediately executed 


如果有子组件，那么父亲的useEffect要先等子组件的render和useEffect完事儿后再被call
*/

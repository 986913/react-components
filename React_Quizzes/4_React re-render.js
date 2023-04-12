// This is a React Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function A({ children }) {
  console.log('A');
  const [state, setState] = useState(0);
  useEffect(() => {
    setState((state) => state + 1);
  }, []);

  return children;
  /* Here even on state change of `A` parent component, child components will not re-render. When the parent state
  changes, parent component re-renders. But it still has the same children prop it got last time, 
  so React doesn’t visit that subtree. And as a result, child component doesn’t re-render.
  
  Thus there are two ways to prevent child components from re-rendering.
    - wrapping them in `memeo`
    - passing them as `children` prop
 */

  /**
    本质上 children 是一个对象，在 App 中已经生成了，是通过调用函数生成的
    回归到理解 jsx 是啥上，是书写 React.createElement 的语法糖
    React.createElement 的第一个参数如果是函数，调用函数，拿到返回值
  */
}

function B() {
  console.log('B');
  return <C />;
}

function C() {
  console.log('C');
  return null;
}

function D() {
  console.log('D');
  return null;
}

function App() {
  console.log('App');
  return (
    <div>
      <A>
        <B />
      </A>
      <D />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/* Ans:

"App"
"A"
"B"
"C"
"D"
"A"

*/

/**
 * 1. render 函数 !== 重新更新 dom
 * 2. 导致 render 函数的来源
 *  1. props(父亲传入就算是有 props)
 *  2. state
 *  3. 父组件渲染
 * 3. 利用 memo 可以减少render 函数
 */

// This is a React Quiz from BFE.dev, What does the code snippet to the right output by console.log?

'infiniteLoopProtection:false';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [state, setState] = useState(0);
  console.log(1);

  const start = Date.now();
  while (Date.now() - start < 50) {
    window.timestamp = Date.now();
  }

  useEffect(() => {
    console.log(2);
  }, [state]);

  Promise.resolve().then(() => console.log(3));

  setTimeout(() => console.log(4), 0);

  useLayoutEffect(() => {
    console.log(5);
    setState((state) => state + 1);
  }, []);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// 没搞懂
/*
  1
  5
  2
  1
  2
  3
  3
  4
  4
 */

// This is a React Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function A({ children }) {
  console.log('A');
  return children;
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
  const [state, setState] = useState(0);
  useEffect(() => {
    setState((state) => state + 1);
  }, []);
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

/**
  "App"
  "A"
  "B"
  "C"
  "D"
  "App"
  "A"
  "B"
  "C"
  "D"
 */

/**
 * When rerendering function is called in parent component, the sebsequent component will re-render whether they are changed or not

 * In JS, B is a function. B will only evaluate when we call it. B()
 * We are passing B function in A. It will pass without running.
 * When we return children react will execute the B.
 */

// This is a React Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

import React, { useState, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  console.log('App');
  const [state, setState] = useState(0);
  useEffect(() => {
    setState((state) => state + 1);
  }, []);

  useEffect(() => {
    console.log('useEffect 1');
    return () => {
      console.log('useEffect 1 cleanup');
    };
  }, [state]);

  useEffect(() => {
    console.log('useEffect 2');
    return () => {
      console.log('useEffect 2 cleanup');
    };
  }, [state]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    return () => {
      console.log('useLayoutEffect cleanup');
    };
  }, [state]);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/**
  "App" // Initial rendering cycle doesn't run any clean up.
  "useLayoutEffect" // useLayoutEffect is invoked before useEffect
  "useEffect 1"
  "useEffect 2"
  "App" // Re-render
  "useLayoutEffect cleanup" // useLayoutEffect is first to be cleaned up and immediately executed.
  "useLayoutEffect"         // 🟡 useLayoutEffect immediately executed.
  "useEffect 1 cleanup" // Regular useEffects are grouped, cleaned up and then executed for the second rendering cycle.
  "useEffect 2 cleanup"
  "useEffect 1"
  "useEffect 2"
 */

/**
  From React docs: React performs the cleanup when the component unmounts. 
  However, effects run for every render and not just once. This is why React also 
  cleans up effects from the previous render before running the effects next time.
*/

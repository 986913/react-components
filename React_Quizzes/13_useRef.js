// This is a React Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const ref = useRef(null);
  const [state, setState] = useState(1);

  useEffect(() => {
    setState(2);
  }, []);

  console.log(ref.current?.textContent);

  return (
    <div>
      <div ref={state === 1 ? ref : null}>1</div>
      <div ref={state === 2 ? ref : null}>2</div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/**
  undefined 
  "1"
 */

/**
 * undefined - because on initial render ref is set to null and null?.textContent evaluates //to undefined
 * "1" because during initial render current of ref is set to the first div with textContent //value 1,
 *     this value is preserved/cached when useEffect/setState triggers a re-render
 **/

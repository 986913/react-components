// This is a React Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [state1, setState1] = useState(1);

  const [state2] = useState(() => {
    console.log(2);
    return 2;
  });

  console.log(state1);

  useEffect(() => {
    setState1(3);
  }, []);

  return null;
}

ReactDOM.render(<App />, document.getElementById('root'));

/**
2  // If you pass function to useState, then that function gets called right away.
1
3
 */

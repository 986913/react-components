// This is a React Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

import React, { useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const ref = useRef(false);

  useLayoutEffect(() => {
    console.log(1);
    ref.current = true;
  });

  return (
    <button
      autoFocus
      onFocus={() => {
        console.log(!!ref.current);
      }}
    >
      button
    </button>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

/**
false
1
 */

// render 优先于 useLayoutEffect, useLayoutEffect优先于useEffect
// https://blog.logrocket.com/useeffect-vs-uselayouteffect-examples/    --> useEffect vs useLayoutEffect

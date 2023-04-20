// What does the code snippet to the right output by console.log?

import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [show, setShow] = useState(true);
  return <div>{show && <Child unmount={() => setShow(false)} />}</div>;
}

function Child({ unmount }) {
  const isMounted = useIsMounted();
  useEffect(() => {
    console.log(isMounted);
    Promise.resolve(true).then(() => {
      console.log(isMounted);
    });
    unmount();
  }, []);

  return null;
}

function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return isMounted.current; //return the value (current) of useRef variable and the value doesn't change.
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/**
false
false
 */

/**
 * initially the value of ref.current is false, which is captured in isMounted.
 * After the initial render, the value of ref.current changes to true but is not reflected in the useEffect inside Child which holds a reference to the closured value (false).
 */

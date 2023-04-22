import { useState } from 'react';
import useTimeout from './useTimeout';
/**
Create a hook to easily use setTimeout(callback, delay).
    reset the timer if delay changes
    DO NOT reset the timer if only callback changes
*/

export default function App() {
  const [count, setCount] = useState(10);
  /*********************  hook usage: callback function executed after delay ****************************************/
  const changeVal = () => setCount(500);
  useTimeout(changeVal, 1000);

  return (
    <div className='App'>
      <h1>useTimeout I </h1>
      <p>{count}</p>
    </div>
  );
}

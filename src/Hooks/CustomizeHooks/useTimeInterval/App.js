import { useState } from 'react';
import useTimeInterval from './useTimeInterval';
/**
Create a hook to easily use useTimeInterval(callback, delay).
    reset the timer if delay changes
    DO NOT reset the timer if only callback changes
*/

export default function App() {
  const [count, setCount] = useState(10);
  /*********************  hook usage: callback function executed after delay ****************************************/
  const changeVal = () => setCount((prev) => prev + 1);
  useTimeInterval(changeVal, 1000);

  return (
    <div className='App'>
      <h1>useTimeInterval </h1>
      <p>{count}</p>
    </div>
  );
}

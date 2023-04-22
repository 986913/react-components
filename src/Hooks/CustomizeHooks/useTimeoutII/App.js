import { useState } from 'react';
import useTimeout from './useTimeout';

export default function App() {
  const [count, setCount] = useState(20);
  /*********************  hook usage ****************************************/
  const changeVal = () => setCount(500);
  const { reset, clear } = useTimeout(changeVal, 1000);

  return (
    <div className='App'>
      <h1>useTimeout II</h1>

      <p>{count}</p>
      <button onClick={() => setCount((c) => c + 1)}>increment</button>
      <button onClick={clear}>clear timeout</button>
      <button onClick={reset}>reset timeout</button>
    </div>
  );
}

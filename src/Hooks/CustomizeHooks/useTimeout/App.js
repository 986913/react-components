import { useState } from 'react';
import useTimeout from './useTimeout';

export default function App() {
  const [count1, setCount1] = useState(10);
  useTimeout(() => setCount1(0), 1000); // usage

  const [count2, setCount2] = useState(20);
  /*********************  hook usage ****************************************/
  const { reset, clear } = useTimeout(() => setCount2(0), 1000); // usage

  return (
    <div className='App'>
      <h1>useTimeout</h1>
      <p>{count1}</p>
      <hr />

      <p>{count2}</p>
      {/* <button onClick={() => setCount2((c) => c + 1)}>increment</button> */}
      <button onClick={clear}>clear timeout</button>
      <button onClick={reset}>reset timeout</button>
    </div>
  );
}

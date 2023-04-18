import { useState } from 'react';
import { usePrevious } from './usePrevious';

export default function App() {
  const [count, setCount] = useState(0);
  /*********************  hook usage ****************************************/
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Previous count: {previousCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

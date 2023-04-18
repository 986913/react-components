/**
  When we handle async requests in React, we need to pay attention if the component is already unmounted.
  Please implement useIsMounted() for us to easily tell if the component is still not unmounted.
    ie:  return true if component is mounted
         return false if component is unmounted
*/

import { useIsMounted } from './useIsMounted';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  /*********************  hook usage ****************************************/
  const isMounted = useIsMounted(); // 注意： 返回的的isMounted是function!!

  const handleClick = () => {
    if (isMounted()) setCount((c) => c + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

import { useState, useRef } from 'react';

/* 实现一个定时器去自动更新state */

export default function App() {
  const [count, setCount] = useState(0);

  const timerRef = useRef(null);

  // 定时器每隔3秒去更新count state:
  const startTimer = () => {
    if (!timerRef.current) {
      // save the timerID to ref.current
      timerRef.current = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 3000);
    }
  };
  const stopTimer = () => {
    // clear the timerID (ie: ref.current)
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

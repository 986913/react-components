import { useState, useEffect, useRef, useCallback } from 'react';

const useTimer = (initialCount) => {
  const [count, setCount] = useState(initialCount);
  const [isRunning, setIsRunning] = useState(false);
  // 使用 useRef 记录定时器 ID，方便随时清除
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    } else {
      // 关键点：当 isRunning 为 false 时，清除定时器即实现“暂停”
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setCount(initialCount);
  }, [initialCount]);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  return { count, isRunning, start, stop, reset };
};

export default useTimer;

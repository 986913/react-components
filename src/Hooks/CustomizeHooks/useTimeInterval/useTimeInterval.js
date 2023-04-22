import { useEffect, useRef } from 'react';

export default function useTimeInterval(callback, delay) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback; // set callbackRef.current

  useEffect(() => {
    const timer = setInterval(() => callbackRef.current(), delay);

    return () => clearInterval(timer);
  }, [delay]);
}

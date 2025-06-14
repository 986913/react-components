import { useEffect, useRef } from 'react';

export default function useTimeout(callback, delay) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback; // set callbackRef.current

  useEffect(() => {
    const timer = setTimeout(() => callbackRef.current(), delay);

    return () => clearTimeout(timer);
  }, [delay]);
}

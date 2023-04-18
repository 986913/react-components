import { useRef, useEffect } from 'react';

export function useIsMounted() {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    };
  }, []);

  const isMounted = () => ref.current;
  return isMounted; // return function instead of ref.current, because ensure the latest value of ref.current is always used.
}

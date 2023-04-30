import { useRef, useEffect } from 'react';

export function useIsFirstRender() {
  const ref = useRef(true);

  useEffect(() => {
    ref.current = false;
  }, []);

  return ref.current;
}

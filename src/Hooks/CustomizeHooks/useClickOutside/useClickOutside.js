import { useEffect, useRef } from 'react';

export function useClickOutside(callback) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = ({ target }) => {
      if (target && ref.current && !ref.current.contains(target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return ref;
}

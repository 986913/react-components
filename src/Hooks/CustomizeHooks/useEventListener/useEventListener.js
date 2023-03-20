import { useRef, useEffect } from 'react';

export const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef(); // Create a ref that stores handler

  /* Update ref.current value if handler changes.
  This allows our effect below to always get latest handler without us needing to pass it in effect deps array and potentially cause effect to re-run every render.*/
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      element.addEventListener(eventName, eventListener); // Add event listener

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
};

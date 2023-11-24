import { useEffect, useRef } from 'react';

/*
  Implement useUpdateEffect() that it works the same as useEffect() 
  except that it skips running the callback on first render.
 */

export const useUpdateEffect = (effect, deps) => {
  let isFirstRender = useRef(true);

  useEffect(() => {
    // if not 1st render, then no skip
    if (!isFirstRender.current) {
      return effect();
    } else isFirstRender.current = false; // set current value and skip call effect (if its 1st render)
  }, deps);
};

/* implement useEffectOnce() as the name says itself, it runs an effect only once. */

import { useEffect } from 'react';

export const useEffectOnce = (effect) => {
  useEffect(() => {
    return effect();
  }, []);
};

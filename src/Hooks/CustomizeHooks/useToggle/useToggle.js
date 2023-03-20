/**
 * useToggle takes a parameter with boolean value (true/ false),
 * and toggles that value to opposite.
 * It's useful when we want to take some action into it's opposite action,
 * for example: show and hide modal, show more/show less text, open/close side menu.
 */

import { useCallback, useState } from 'react';

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState); // Initialize the state

  /* Define and memorize toggler function in case we pass down the component,
  This function change the boolean value to it's opposite value */
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

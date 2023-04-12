// This is a React Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [state, setState] = useState(0);
  console.log(state);

  useEffect(() => {
    setState((state) => state + 1);
  }, []);

  useEffect(() => {
    console.log(state);
    setTimeout(() => {
      console.log(state);
    }, 100);
  }, []);

  return null;
}

ReactDOM.render(<App />, document.getElementById('root'));

/**
0 // initial log outside of hooks
0 // from the second useEffect, because it is called before the first useEffect hook updates the state to 1 （react async batch setstate）
1 // outside hooks, when state change happened
0 // queued setTimeout(console.log(state)) with closure
 */

/**
When you call setState to update the state of a component, 
React does not immediately update the state and re-render the component. 
Instead, it batches multiple state updates together and applies them in a single re-render for performance reasons. 
This means that when you call setState, you cannot rely on the updated state being immediately available in the same function or hook.

In the example code, the first useEffect hook runs immediately after the component is mounted and calls setState to update the state to 1. 
However, the second useEffect hook, which also runs after the component is mounted, is called before the batched state update is applied and the component is re-rendered. 
Therefore, when the first console.log(state) statement inside the second useEffect hook is executed, the value of state is still 0.

To work around this issue and ensure that the updated state is available in subsequent code, 
you can use the callback version of setState, which takes the current state as an argument and returns the new state. 
By using this approach, you can ensure that your code always has access to the most up-to-date state, even when it is updated asynchronously.
 */

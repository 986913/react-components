import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

// What does the code snippet to the right output by console.log?

function App() {
  const [state, setState] = useState(0);
  console.log(1);

  useEffect(() => {
    console.log(2);
  }, [state]);

  Promise.resolve().then(() => console.log(3));

  setTimeout(() => console.log(4), 0);

  const onClick = () => {
    console.log(5);
    setState((num) => num + 1);
    console.log(6);
  };
  return (
    <div>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

setTimeout(() => userEvent.click(screen.getByText('click me')), 100);

/**
  1
  2
  3
  4
  5
  6
  1
  2
  3
  4
 */

/**
  Trigger sequence in a component rendering:
    synchronous code directly in component (log(1))
    synchronous code in useEffect callback (log(2))
    micro task (log(3) in promise then)
    macro task (log(4) in timeout callback) result: 1 -> 2 -> 3 -> 4

  Trigger sequence in the button click event listener:
    synchronous code (log(5) and log(6))
    setState updates state
    component rerendering caused by the state update, same order with the previous component rendering result 5 -> 6 -> 1 -> 2 -> 3 -> 4
    
  Answer 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 1 -> 2 -> 3 -> 4
 */

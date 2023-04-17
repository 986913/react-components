// This is a React Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

function App() {
  const [state, setState] = useState(0);
  const increment = () => {
    setTimeout(() => {
      setState(state + 1);
    }, 0);
  };
  console.log(state);
  return (
    <div>
      <button onClick={increment}>click me</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// click the button twice
userEvent.click(screen.getByText('click me'));
userEvent.click(screen.getByText('click me'));

/**
 0
 1
 1
 */

/**
TASK 1 BEGINS

App is called
fn increment's closure is set to current value of state i.e. 0, ensuring that setState will be called 0+1 i.e.1
state is printed ---->0
first render occurs
first click occurs, then first setTimeout is scheduled to set state as 1
second click occurs, then second setTimeout is scheduled to set state as 1 TASK 1 ENDS
<event loop loads task 2 into the main stack>

TASK 2 BEGINS

setState is called with 1
second render occurs
state is printed ---->1
<event loop loads task 3 into the main stack>

TASK 3 BEGINS

setState is called with 1
second render occurs
state is printed ---->1

*/

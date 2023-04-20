import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
// What does the code snippet to the right output by console.log?

function A() {
  console.log('render A');
  return null;
}

function App() {
  const [_state, setState] = useState(false);
  console.log('render App');
  return (
    <div>
      <button
        onClick={() => {
          console.log('click');
          setState(true);
        }}
      >
        click me
      </button>
      <A />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

userEvent.click(screen.getByText('click me'));
userEvent.click(screen.getByText('click me'));
userEvent.click(screen.getByText('click me'));

/**
"render App"
"render A"
"click"
"render App"
"render A"
"click"
"render App"
"click"
 */

/*
A class component will always re-render when this.setState unless it's a pure component or shouldComponentUpdate is used
A functional component will not re-render if setState is called with the same value, However for an occasional case if the setter is called immediately it does result in two renders instead of one
*/

//https://stackoverflow.com/questions/55373878/what-are-the-differences-when-re-rendering-after-state-was-set-with-hooks-compar

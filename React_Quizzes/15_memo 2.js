// What does the code snippet to the right output by console.log?

import React, { memo, useState } from 'react';
import ReactDOM from 'react-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

function _B() {
  console.log('B');
  return null;
}

const B = memo(_B);

function _A({ children }) {
  console.log('A');
  return children;
}

const A = memo(_A);

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>click me</button>
      <A>
        <B />
      </A>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

userEvent.click(screen.getByText('click me'));

/**
"A"
"B"
"A"
*/

// first render, both component will be rendered --->
// "A"
// "B"
// second render:  🟡 children prop makes React.memo() not work 🟡
// (也就是说虽然A用了react.memo()进行了memoried. 但是A还接受了children 并且 children prop makes React.memo() not work，所以还是render了A, 然后因为B只用了react.memo所以不再render again) --> "A"

//https://gist.github.com/slikts/e224b924612d53c1b61f359cfb962c06

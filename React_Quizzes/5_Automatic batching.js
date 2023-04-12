// This is a React Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

function App() {
  const [state, setState] = useState(0);
  console.log('App ' + state);
  return (
    <div>
      <button
        onClick={() => {
          setState((count) => count + 1);
          setState((count) => count * 2);
        }}
      >
        click me
      </button>
    </div>
  );
}

(async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);

  userEvent.click(await screen.findByText('click me'));
})();

/**
 * answer:
    "App 0"
    "App 2"
 */

/**
 * The output of this code will be "App 0" logged to the console when the App component is initially rendered,
 *  and "App 2" logged to the console when the button is clicked.
 * This is because, when the button is clicked, the first setState call updates the state to 1 and the second setState call updates it to 2 (1*2).
 * It should be noted that the second setState call will be batched and update the state after the first one. This is due to the way React updates the state.
 */

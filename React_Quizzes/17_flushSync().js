// This is a React Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

import React, { useState } from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

function App() {
  const [state, setState] = useState(0);
  const onClick = () => {
    console.log('handler');
    flushSync(() => {
      setState((state) => state + 1);
    });
    console.log('handler ' + state);
  };
  console.log('render ' + state);
  return (
    <div>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
// click the button
userEvent.click(screen.getByText('click me'));

/**
"render 0"
"handler"
"render 1"  //logged first because flushSync causes the DOM to synchronously get re-rendered with the new state
"handler 0" //logged after flushSync, but using the state that was available when this function first initialized
 */

/**
  flushSync 是 React 提供的一个 API，用于立即执行组件更新并同步渲染。它可以用于在 React 应用程序中控制渲染时机，以及确保在执行更新时没有副作用或闪烁。

  在 React 中，组件更新通常是异步的，因为 React 会将多个 setState 调用合并为一个更新，以提高性能并避免不必要的渲染。
  但是，在某些情况下，您可能希望立即执行更新，例如在处理用户输入时，确保某些状态已更新后再执行其他操作。

  flushSync 方法提供了这种立即更新的能力，它可以让 React 立即执行组件的更新并同步渲染，而不需要等待 React 的下一个渲染周期。

  使用 flushSync 方法时需要注意，它会强制 React 立即更新组件，并且不会对更新进行合并，因此会影响性能。
  因此，应该只在必要的情况下使用它，而不是在组件渲染期间随意使用。
 *
 */

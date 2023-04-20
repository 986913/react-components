// This is a React Quiz from BFE.dev

import React, { Suspense, useMemo } from 'react';
import ReactDOM from 'react-dom';

const resource = (() => {
  let data = null;
  let status = 'pending';
  let fetcher = null;
  return {
    get() {
      if (status === 'ready') {
        return data;
      }
      if (status === 'pending') {
        fetcher = new Promise((resolve, reject) => {
          setTimeout(() => {
            data = 1;
            status = 'ready';
            resolve();
          }, 100);
        });
        status = 'fetching';
      }

      throw fetcher;
    },
  };
})();

function A() {
  console.log(1);
  const memoed = useMemo(() => {
    console.log(2);
    return 'memo';
  }, []);

  const data = resource.get();
  console.log(3);
  return memoed + data;
}

function App() {
  return (
    <Suspense fallback={null}>
      <A />
    </Suspense>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/**
1
2
1
2
3
 */

/*
  The App component is mounted and renders the A component within a Suspense component.
  The A component starts rendering and logs 1 to the console.
  The useMemo hook is called, and it logs 2 to the console.
  The resource.get() function is called, which enters the pending state and then throws a fetcher promise because the status is still 'pending'.
  The rendering of the A component is suspended due to the Suspense component.
  After 100ms, the fetcher promise is resolved, sets the status to 'ready', and the data to 1.
  The A component resumes rendering and logs 1 to the console again because the entire component is re-rendered due to the resolved fetcher promise.
  The useMemo hook is called again, and it logs 2 to the console again.
  The data variable is now set to 1, so the A component can continue rendering and logs 3 to the console.
  The A component returns the concatenated result of the memoized value 'memo' and the value of data, which is 1.
*/
/*
Suspense component will be rendered when a child ran into async render (but other children will be rendered first) 
and all children in Suspense will be re-rendered after async resolve
*/

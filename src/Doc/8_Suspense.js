// This is a React Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

import React, { Suspense } from 'react';
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
  console.log('A1');
  const data = resource.get();
  console.log('A2');
  return <p>{data}</p>;
}

function B() {
  console.log('B');
  return null;
}

function Fallback() {
  console.log('fallback');
  return null;
}

function App() {
  console.log('App');
  return (
    <div>
      <Suspense fallback={<Fallback />}>
        <A />
        <B />
      </Suspense>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/**
  "App"
  "A1" // ran into async render
  "B"  // render other children first
  "fallback" // render fallback
  "A1" // rerender all children once async resolved
  "A2"
  "B"
 */

/**
  Suspense component will be rendered when a child ran into async render (but other children will be rendered first) 
  and all children in Suspense will be re-rendered after async resolve
*/

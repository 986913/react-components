import React, { useEffect, useState, useMemo } from 'react';

let renderTimes = 1;
const Child = () => {
  useEffect(() => {
    renderTimes++;
  });
  return <div>render: {renderTimes} times</div>;
};

export default function App() {
  const [i, setI] = useState(1);
  const memoChild = useMemo(() => <Child />, []);

  return (
    <div>
      <p>i: {i}</p>
      <button onClick={() => setI(i + 1)}> increase </button>

      <h3>normal render: </h3>
      <Child />

      <h3>after memorize render: </h3>
      {memoChild}
    </div>
  );
}

import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'MIUNS':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <div>state: {state.count}</div>
      <button onClick={() => dispatch({ type: 'ADD' })}>add</button>
      <button onClick={() => dispatch({ type: 'MIUNS' })}>miuns</button>
    </>
  );
}

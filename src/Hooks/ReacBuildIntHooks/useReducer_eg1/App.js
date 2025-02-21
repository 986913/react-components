import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + action.payload,
      };
    case 'MIUNS':
      return {
        ...state,
        count: state.count - action.payload,
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const plus = () => {
    dispatch({ type: 'ADD', payload: 5 });
  };
  const minus = () => {
    dispatch({ type: 'MIUNS', payload: 5 });
  };

  return (
    <>
      <div>state: {state.count}</div>
      <button onClick={plus}>add</button>
      <button onClick={minus}>miuns</button>
    </>
  );
}

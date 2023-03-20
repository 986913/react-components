import React, { useState, useCallback, useEffect } from 'react';

const List = ({ getItems }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(getItems(5));
    console.log('updating items');
  }, [getItems]);
  return items.map((item) => <div key={item}>{item}</div>);
};

export default function App() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  const theme = {
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black',
  };
  /* when toggle the theme, then this getItems function also will be called, this is not expected */
  /*
  const getItems = () => {
    return [number, number + 1, number + 2];
  };*/

  // after useCallback:
  const getItems = useCallback(
    (n) => {
      return [number + n, number + 1 + n, number + 2 + n];
    },
    [number]
  );

  /* useMemo VS useCallback: 
  1. useMemo doesn't return the function it only return the value of the function
  2. useCallback return the function
  3. useCallback works nearly identically to useMemo since it will cache a result based on an array of dependencies, but useCallback is used specifically for caching functions instead of caching values.
  */

  return (
    <div className='App' style={theme}>
      <input
        type='number'
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <br />
      <br />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Toggle theme
      </button>
      <br />
      <br />
      <List getItems={getItems} />
    </div>
  );
}

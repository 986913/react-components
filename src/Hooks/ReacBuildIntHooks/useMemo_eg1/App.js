import React, { useState, useMemo, useEffect } from 'react';

// https://www.youtube.com/watch?v=THL1OPn72vo&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=3&ab_channel=WebDevSimplified
const slowFn = (n) => {
  console.log('calling slow function');
  for (let i = 0; i <= 1000000000; i++) {
    // do noting
  }
  return n * 2;
};

export default function App() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  /* slowFn is called everytime, some case we don't need to re-run slowFn.
  for example, when we change the theme , so need to call slowFn */
  // const doubled = slowFn(number);

  /* useMemo has dependiency.
    if dependiency value change, it will run useMemo inside
  */
  const doubled = useMemo(() => {
    return slowFn(number);
  }, [number]);

  /* useEffect is called everytime, some case we don't need to re-run useeffect.
  for example, when we double the number , the useeffect is also called  */
  /*
  const theme = {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "dark"
  };
  */

  /*
  Now if dark do not change the theme variable will be set to the cached version of theme 
  which means the reference for theme will only change if dark change */
  const theme = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'dark',
    };
  }, [dark]);

  useEffect(() => {
    console.log('theme changed');
  }, [theme]);

  return (
    <div className='App'>
      <input
        type='number'
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value, 10))}
      />
      <br />
      <br />

      <div style={theme}>{doubled}</div>

      <br />
      <br />

      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Change Theme
      </button>
    </div>
  );
}

import React, { useCallback, useEffect, useState } from 'react';

const List = ({ getItems }) => {
  const [items, setItems] = useState([]);

  /* issue is:

  the depencies is a function, and UseCallback component each render will produce a new getItems function
  so useEffect got called no matter we changed number or toggle theme
  we want useEffect got called when we changed number ONLY， so useCallback can help this
  
  父组件更新时，通过props传递给子组件的函数也会重新创建，然后这个时候使用 useCallBack 就可以缓存函数不使它重新创建
  */

  useEffect(() => {
    setItems(getItems());
    console.log('updating items..');
  }, [getItems]);

  return (
    <ul>
      {items.map((item) => {
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
};

export default function App() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const themeStyle = {
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'dark',
    padding: '30px',
  };

  /* without useCallback :*/
  const getItems = () => {
    return [number + 1, number + 2, number + 3];
  };

  /* after useCallback: */
  // const getItems = useCallback(() => {
  //   return [number + 1, number + 2, number + 3];
  // }, [number]);

  return (
    <div style={themeStyle}>
      <input
        type='number'
        value={number}
        onChange={(e) => {
          setNumber(parseInt(e.target.value));
        }}
      />
      <button
        onClick={() => {
          setDark(!dark);
        }}
      >
        toggle theme
      </button>
      <List getItems={getItems} />
    </div>
  );
}

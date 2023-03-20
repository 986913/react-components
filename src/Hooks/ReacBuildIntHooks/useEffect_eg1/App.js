import React, { useState, useEffect } from 'react';

export default function App() {
  const [type, setType] = useState('');
  const [items, setItems] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  /*
  useEffect(() => {
    console.log(
      "execute after every re-render: componentDidMount+componentDidUpdate"
    );
  });*/

  /*
  useEffect(() => {
    console.log("execute after type changed");
  }, [type]); 
  */

  /*
  useEffect(() => {
    console.log("execute ONLY one time: componentDidMount");
  }, []); */

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((response) => response.json())
      .then((json) => setItems(json));
  }, [type]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // clean up: useEffect can return a function, inside that function can write down your clean up code.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div>
        <button onClick={() => setType('posts')}>Posts</button>
        <button onClick={() => setType('users')}>Users</button>
        <button onClick={() => setType('comments')}>Comments</button>
      </div>
      <h1>{type}</h1>

      {items.map((item) => (
        <pre key={item.id}>{JSON.stringify(item)}</pre>
      ))}

      <div>{windowWidth}</div>
    </>
  );
}

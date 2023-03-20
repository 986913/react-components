import { useState, useRef, useEffect } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const prevName = useRef('');
  // 当name变化时，重新赋值prevName.current
  useEffect(() => {
    prevName.current = name;
  }, [name]);
  return (
    <div className='App'>
      <p>my name is {name}</p>
      {/* 注意是prevName.current  */}
      <p>my previous name is {prevName.current}</p>

      <input type='text' onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const prevName = useRef('');
  /* 
    当name变化时，重新赋值prevName.current:

    useEffect 在渲染完成后执行，所以 prevName.current = name 会在 UI 渲染完后更新，
    这样UI下一次渲染时，它才是上一次的 name。
  */
  useEffect(() => {
    prevName.current = name;
  }, [name]);
  return (
    <div className='App'>
      {/* 现在的name */}
      <p>my name is {name}</p>
      {/* 注意是prevName.current  */}
      <p>my previous name is {prevName.current}</p>

      <input type='text' onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

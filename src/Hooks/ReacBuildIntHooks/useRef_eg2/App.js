import { useEffect, useRef, useState } from 'react';

export default function App() {
  const [text, setText] = useState('');

  const renderTimes = useRef(1);
  useEffect(() => {
    renderTimes.current = renderTimes.current + 1;
  });

  return (
    <div className='App'>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>the component render {renderTimes.current} times</p>
    </div>
  );
}

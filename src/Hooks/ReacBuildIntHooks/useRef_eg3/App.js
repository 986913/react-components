import { useRef, useEffect } from 'react';

export default function App() {
  const inputEle = useRef();
  const handleOnClick = () => inputEle.current.focus();

  const inputEle2 = useRef();
  useEffect(() => {
    inputEle2.current.value = 'initial text value set';
  }, []);
  return (
    <div className='App'>
      <input type='text' ref={inputEle} />
      <button onClick={handleOnClick}>button</button>

      <br />
      <input type='text' ref={inputEle2} />
    </div>
  );
}

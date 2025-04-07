import { useEffect, useRef, useState } from 'react';
import { useFetch } from './useFetch';

const URLS = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/4',
];

export default function App() {
  const [currentIdx, setCurIdx] = useState(0);

  // 这里的useRef解释，你可以看useRef Folder里头更详细解释，这里就是设置一个每1秒的定时器去更新URLS index,去fetch不同的url而已
  let timerRef = useRef(null);
  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setCurIdx((prevIdx) => Math.floor((prevIdx + 1) % URLS.length));
      }, 1000);
    }
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, []);

  /*********************  hook usage ****************************************/
  const { data, status, error } = useFetch(URLS[currentIdx]); // 参数是url, 输出是object,其中有data,status,errors

  return (
    <div className='App'>
      <p>status is {status}</p>
      <p>data is {JSON.stringify(data)}</p>
      <p>data is {JSON.stringify(error)}</p>
    </div>
  );
}

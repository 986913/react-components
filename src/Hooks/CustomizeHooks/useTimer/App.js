import useTimer from './userTimer';

export default function App() {
  /*********************  hook usage ****************************************/
  const { start, stop, reset, isRunning, count } = useTimer(0);

  return (
    <>
      <h1>Timer App</h1>
      <div>
        <h2>Count: {count}</h2>
        <div>
          <button onClick={start}>Start</button>
          <button onClick={stop}>Stop</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
      <h2>{isRunning && 'Timer is active'}</h2>
    </>
  );
}

import { useWindowSize } from './useWindowSize';

export default function App() {
  /*********************  hook usage **************************/
  const { curWidth: width, curHeight: height } = useWindowSize();

  return (
    <div className='App'>
      <p>
        Width: {width}, Height: {height}
      </p>
    </div>
  );
}

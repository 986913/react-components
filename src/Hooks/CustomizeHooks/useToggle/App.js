import { useToggle } from './useToggle';

export default function App() {
  /*********************** Hooks usages *************************/
  // Call the useToggle hook which returns current value and the toggler function
  const [isTextChanged, setIsTextChanged] = useToggle();
  const [isDisplay, setIsDisplay] = useToggle();

  return (
    <div className='App'>
      <h3>useToggle:</h3>
      <button onClick={setIsTextChanged}>
        {isTextChanged ? 'Toggled' : 'Click to Toggle'}
      </button>

      <hr />

      <button onClick={setIsDisplay}>toggle modal</button>
      {isDisplay && <div>modal is display...</div>}
    </div>
  );
}

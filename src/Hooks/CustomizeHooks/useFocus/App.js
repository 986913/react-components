import { useFocus } from './useFocus';

export default function App() {
  /*********************  hook usage ****************************************/
  const [ref, isFocused] = useFocus();
  return (
    <div>
      <input ref={ref} />
      {isFocused && <p>focused</p>}
    </div>
  );
}

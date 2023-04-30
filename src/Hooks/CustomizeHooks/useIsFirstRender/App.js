import { useIsFirstRender } from './useIsFirstRender';

export default function App() {
  /*********************  hook usage ****************************************/
  // only true for the first render
  const isFirstRender = useIsFirstRender();

  if (isFirstRender) {
    console.log('This is the first render of MyComponent');
  }

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}

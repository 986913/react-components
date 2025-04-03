import { useRandomTitle } from './useRandomTitle';

const greetings = ['你好', 'hi', 'ciao', 'halo'];

export default function App() {
  /*********************  hook usage **************************/
  const changeToNextTitle = useRandomTitle(greetings);

  return (
    <div className='App'>
      <h3>点击button时，注意看Tab的title变化 </h3>
      <button onClick={changeToNextTitle}>Say Hi! </button>
    </div>
  );
}

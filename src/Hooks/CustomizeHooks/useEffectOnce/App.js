import { useEffectOnce } from './useEffectOnce';

export default function App() {
  /*********************  hook usage ****************************************/
  useEffectOnce(() => {
    console.log('This runs only once!');
  });

  console.log('App rendered!'); // 在控制台中查看是否只有一次打印

  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}

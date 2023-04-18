import { useOnline } from './useOnline';

export default function App() {
  /*********************  hook usage ****************************************/
  const online = useOnline();
  return (
    <p>online: {online ? <span>connected! </span> : <span>lost...</span>}</p>
  );
}

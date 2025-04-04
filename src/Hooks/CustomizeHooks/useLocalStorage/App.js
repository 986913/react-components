import { useLocalStorage } from './useLocalStorage';

export default function App() {
  /*********************  hook usage **************************/
  const [user, setUser] = useLocalStorage('user', 'MingYue'); // hook参数是key, value for local storage

  return (
    <div className='App'>
      <select value={user} onChange={(e) => setUser(e.target.value)}>
        <option>Brian</option>
        <option>MingYue</option>
        <option>Mingjie</option>
        <option>Yoyi</option>
        <option>Tri Tri</option>
        <option>Du Du</option>
      </select>
    </div>
  );
}

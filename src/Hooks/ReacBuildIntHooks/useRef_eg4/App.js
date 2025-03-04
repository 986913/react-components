import { useState, useEffect, useRef } from 'react';

/*
export default function App() {
  const [message, setMessage] = useState("");
  const handleMessageChange = (e) => setMessage(e.target.value);
  const showMessage = () => alert(`u said ${message}`);
  //经常会展示出老的DATA, 这不是我想要的
  const handleSentClick = () => setTimeout(showMessage, 3000);
  return (
    <div className="App">
      <input value={message} onChange={handleMessageChange} />
      <button onClick={handleSentClick}>sent</button>
    </div>
  );
}
*/
export default function App() {
  const latestMsg = useRef('');
  const handleMessageChange = (e) => (latestMsg.current = e.target.value);
  const showMessage = () => alert(`u said ${latestMsg.current}`);
  //用了useRef会，总是会展现最新的DATA
  const handleSentClick = () => setTimeout(showMessage, 3000);
  return (
    <div className='App'>
      <input value={latestMsg.current} onChange={handleMessageChange} />
      <button onClick={handleSentClick}>sent</button>
    </div>
  );
}

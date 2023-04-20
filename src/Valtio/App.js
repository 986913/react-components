import React from 'react';
/*---------- 这玩意儿没看懂 -------- */
import { proxy, useSnapshot } from './valtioHelper';

const state = proxy({ count: 0, text: 'hello' });

const App = () => {
  const snap = useSnapshot(state);
  return (
    <div>
      {snap.count}
      <button onClick={() => ++state.count}> +1 </button>
    </div>
  );
};

// you can mutate the state from anywhere
setInterval(() => {
  ++state.count;
}, 1000);

export default App;

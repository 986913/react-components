import { useState, useCallback } from 'react';
import { useEventListener } from './useEventListener';

export default function App() {
  // State for storing mouse coordinates
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Event handler utilizing useCallback so that reference never changes.
  const handler = useCallback(
    ({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY }); // Update coordinates
    },
    [setCoords]
  );

  // Add event listener using our hook
  useEventListener('mousemove', handler);

  return (
    <div className='App'>
      <h1>useEventListener: </h1>
      <h1>
        The mouse position is ({coords.x}, {coords.y})
      </h1>
    </div>
  );
}

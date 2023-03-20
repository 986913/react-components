import { useHover } from './useHover';

export default function App() {
  const [hoverRef, isHovered] = useHover();

  return (
    <div className='App'>
      <h3>use hover: </h3>
      return <div ref={hoverRef}>{isHovered ? '😁' : '☹️'}</div>
    </div>
  );
}

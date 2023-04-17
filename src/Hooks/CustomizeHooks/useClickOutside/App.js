import { useClickOutside } from './useClickOutside';

export default function App() {
  const ref = useClickOutside(() => {
    alert('you clicked outside, implement any callback here..');
  });

  return <div ref={ref}>.........</div>;
}

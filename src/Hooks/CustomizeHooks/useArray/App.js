import { useArray } from './useArray';

/* 
  When array is used in React state, we need to deal with actions such as push and remove:
    const {value, push, removeByIndex} = useArray([1, 2, 3])
*/

export default function App({ props }) {
  /********************* useArray hook usage ****************************************/
  const { value, push, removeByIndex } = useArray([
    'apple',
    'banana',
    'orange',
  ]);
  const handleAdd = () => push('grape');
  const handleRemove = (index) => removeByIndex(index);

  return (
    <div>
      <h1>Fruits</h1>
      <ul>
        {value.map((fruit, index) => (
          <li key={index}>
            {fruit}
            <button onClick={() => handleRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAdd}>Add Fruit</button>
    </div>
  );
}

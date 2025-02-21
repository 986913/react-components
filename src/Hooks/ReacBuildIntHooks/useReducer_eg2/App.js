import React, { useReducer, useState } from 'react';

const reducer = (todos, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...todos, newTodo(action.payload.name)];
    case 'TOGGLE_TODO':
      return todos.map((todo) => {
        if (todo.id === action.payload.id)
          return { ...todo, complete: !todo.complete };
        return todo;
      });
    case 'DEL_TODO':
      return todos.filter((todo) => {
        return todo.id !== action.payload.id;
      });
    default:
      return todos;
  }
};

const newTodo = (name) => {
  return {
    id: Date.now(),
    name,
    complete: false,
  };
};

const initState = [{ name: 'ming', id: Date.now(), completed: false }];
export default function App() {
  const [input, setInput] = useState('cook');
  const [todos, dispatch] = useReducer(reducer, initState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TODO', payload: { name: input } });
    setInput('');
  };
  const handleToggle = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  };
  const handleDelete = (id) => {
    dispatch({ type: 'DEL_TODO', payload: { id } });
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
      </form>

      {todos.map((todo) => {
        const { id, name, complete } = todo;
        return (
          <div key={id}>
            <span style={{ color: complete ? '#AAA' : '#000' }}>{name}</span>
            <button onClick={() => handleToggle(id)}>Toggle</button>
            <button onClick={() => handleDelete(id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

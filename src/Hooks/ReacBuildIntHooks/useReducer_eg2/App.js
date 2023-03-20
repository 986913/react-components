import React, { useReducer, useState } from 'react';

const ACTIONS = {
  ADD_TODO: 'add todo',
  DEL_TODO: 'delete todo',
  TOGGLE_TODO: 'toggle todo',
};

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id)
          return { ...todo, complete: !todo.complete };
        return todo;
      });
    case ACTIONS.DEL_TODO:
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

export default function App() {
  const [name, setName] = useState('ming');
  const [todos, dispatch] = useReducer(reducer, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name } });
    setName('');
  };
  const handleToggle = (id) =>
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id } });
  const handleDelete = (id) =>
    dispatch({ type: ACTIONS.DEL_TODO, payload: { id } });

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
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

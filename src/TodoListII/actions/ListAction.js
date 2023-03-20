import store from '../store/store';

export const addTodo = (newTodo) => {
  return store.dispatch({
    type: 'ADD_TO_DO',
    newTodo,
  });
};

export const delTodo = (id) => {
  return store.dispatch({
    type: 'DEL_TO_DO',
    id,
  });
};

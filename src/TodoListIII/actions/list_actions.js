export const addTodo = (newItem) => {
  return {
    type: 'ADD_TO_DO',
    newItem,
  };
};

export const delTodo = (currentItem) => {
  return {
    type: 'DELETE_TO_DO',
    currentItem,
  };
};

import store from '../store/store';

export const updateTypeInput = (newValue) => {
  // console.log(newValue);
  return store.dispatch({
    type: 'UPDATE_TYPE_INPUT',
    newValue,
  });
};

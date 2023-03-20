import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './containers/AppContainer';
import store from './store/index';

/* This is react-redux version of todolist */
export const TodolistWrapperIII = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

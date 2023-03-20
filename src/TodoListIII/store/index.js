import { createStore } from 'redux';
import appReducer from '../reducers/appReducer';

const store = createStore(appReducer);

export default store;

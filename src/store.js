// store.js

import { createStore, combineReducers } from 'redux';
import countriesReducer from './reducers/countriesReducer';

const rootReducer = combineReducers({
  countries: countriesReducer,
});

const store = createStore(rootReducer);

export default store;

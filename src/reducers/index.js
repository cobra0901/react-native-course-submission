/* @flow */
import { combineReducers } from 'redux';
import decksReducer from './decksReducer';

export default combineReducers({
  decks: decksReducer,
});

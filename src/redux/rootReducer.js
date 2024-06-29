import { combineReducers } from 'redux';
import { operationsReducer } from './operationsReducer';

export const rootReducer = combineReducers({
  operationsReducer,
});

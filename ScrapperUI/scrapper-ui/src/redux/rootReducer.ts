// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import authReducer, { authReducerState } from './reducers/authReducer';
import websiteDetailsReducer, { websiteReducerState } from './reducers/websiteDetailsReducer';

export interface RootState {
    auth: authReducerState,
    websiteDetails: websiteReducerState
}

const rootReducer = combineReducers({
  auth: authReducer,
  websiteDetails: websiteDetailsReducer
});

export default rootReducer;

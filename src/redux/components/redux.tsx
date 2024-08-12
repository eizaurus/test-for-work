import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import {todoReducer,action,selector} from './reduce.tsx';
const reducer = combineReducers({ todo: todoReducer });
/* const enhancer = applyMiddleware(thunkMiddleware); */
const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export {action,selector,store, useDispatch as AppD, useSelector as AppS };
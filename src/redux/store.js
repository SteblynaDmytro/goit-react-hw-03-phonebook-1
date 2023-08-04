import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactSlice';
import thunkMiddleware from 'redux-thunk';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    contacts: contactsReducer,
  },
  middleware: [thunkMiddleware],
});

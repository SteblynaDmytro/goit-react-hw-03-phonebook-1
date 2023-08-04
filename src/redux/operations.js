import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const contacts = await api.fetchContacts();
  return contacts;
});

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    const data = await api.deleteContact(id);
    return data;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const data = await api.addContact(contact);
    return data;
  }
);

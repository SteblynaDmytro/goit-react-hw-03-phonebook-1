import axios from 'axios';
axios.defaults.baseURL = 'https://64cd45debb31a268409a8a22.mockapi.io/api/v1/';

export async function fetchContacts() {
  const { data } = await axios.get('/contacts');
  return data;
}

export async function deleteContact(id) {
  const { data } = await axios.delete(`/contacts/${id}`);
  return data;
}

export async function addContact(data) {
  const { data: result } = await axios.post(`/contacts/`, data);
  return result;
}

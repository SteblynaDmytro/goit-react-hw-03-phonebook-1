import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: '',
  },
  reducers: {
    contactFilter(state, action) {
      state.filter = action.payload;
    },
  },
});
export const { contactFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    getAll(state) {
      return state;
    },
  },
});

export const { getAll } = blogsSlice.actions;
export default blogsSlice.reducer;

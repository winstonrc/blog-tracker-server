import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(_state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, appendBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export default blogsSlice.reducer;

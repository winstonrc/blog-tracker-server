import { createSlice, current } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const sortByLikes = (a, b) => b.likes - a.likes;

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(_state, action) {
      const list = action.payload.sort(sortByLikes);
      return list;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    like(state, action) {
      const likedBlog = action.payload;

      const list = state
        .map((blog) => (blog.id === likedBlog.id ? likedBlog : blog))
        .sort(sortByLikes);

      return list;
    },
    remove(state, action) {
      const removedBlog = action.payload;

      const list = current(state)
        .filter((blog) => blog.id !== removedBlog.id)
        .sort(sortByLikes);

      return list;
    },
  },
});

export const { setBlogs, appendBlog, like, remove } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
    } catch (error) {
      console.log('create blog error', error);
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const blogToUpdate = {
        ...blog,
        likes: blog.likes + 1,
      };

      await blogService.update(blogToUpdate);
      dispatch(like(blogToUpdate));
    } catch (error) {
      console.log('add like error', error);
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog);
      dispatch(remove(blog));
    } catch (error) {
      console.log('remove blog error', error);
      setNotification('Blog already removed', 'red');
    }
  };
};

export default blogsSlice.reducer;

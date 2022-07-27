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

      const list = current(state)
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

export const getBlogs = () => {
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

      if (error.message === 'Request failed with status code 401') {
        dispatch(setNotification('Must be logged in to add blog', 'error'));
      } else {
        dispatch(setNotification('Unable to add blog', 'error'));
      }
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

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog);
      dispatch(remove(blog)) &&
        dispatch(setNotification(`Removed blog: ${blog.title}`, 'success'));
    } catch (error) {
      console.log('remove blog error', error);
      dispatch(setNotification('Blog already removed', 'error'));
    }
  };
};

export default blogsSlice.reducer;

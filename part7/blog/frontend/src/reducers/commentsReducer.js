import { createSlice } from '@reduxjs/toolkit';
import commentsService from '../services/comments';
import { setNotification } from './notificationReducer';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(_state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setComments, appendComment } = commentsSlice.actions;

export const getComments = (blogId) => {
  return async (dispatch) => {
    const comments = await commentsService.getAll(blogId);
    dispatch(setComments(comments));
  };
};

export const createComment = (blogId, text) => {
  return async (dispatch) => {
    try {
      const newComment = await commentsService.create(blogId, text);
      dispatch(appendComment(newComment)) &&
        dispatch(setNotification('Comment added', 'success'));
    } catch (error) {
      console.log('create comment error', error);
      dispatch(setNotification('Unable to create comment', 'error'));
    }
  };
};

export default commentsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = null;
let timeout = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(_state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export const { setMessage, clearNotification } = notificationSlice.actions;

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    if (!seconds) {
      seconds = 5;
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    dispatch(setMessage(message));

    timeout = setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
